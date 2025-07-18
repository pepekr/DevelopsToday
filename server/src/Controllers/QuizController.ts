import { Response, Request } from "express";
import { FullQuiz } from "../../../shared/interfaces/Quiz.js";
import { QuizService } from "Services/QuizService.js";
import { PrismaQuizRepository } from "DataLayer/PrismaQuizRepository.js";
import { PrismaQuestionRepository } from "DataLayer/PrismaQuestionRepository.js";
import { QuestionService } from "Services/QuestionService.js";
import { PrismaAnswerRepository } from "DataLayer/prismaAnswerRepository.js";
import { AnswerService } from "Services/AnswerService.js";

const prismaQuiz = new PrismaQuizRepository();
const quizService = new QuizService(prismaQuiz);

const prismaQuestion = new PrismaQuestionRepository();
const questionService = new QuestionService(prismaQuestion);

const prismaAnswer = new PrismaAnswerRepository();
const answerService = new AnswerService(prismaAnswer);

export async function CreateFullQuiz(req: Request, res: Response) {
  const quiz: FullQuiz = req.body;
  const userId: string = res.locals.userId;
  if (!userId) return res.status(400).json({ error: "Missing credentials" });
  if (
    !quiz ||
    !quiz.name ||
    !Array.isArray(quiz.questions) ||
    quiz.questions.length === 0 ||
    quiz.questions.some(
      (q) =>
        !Array.isArray(q.answers) ||
        !q.answers.some((a) => a.isCorrect === true)
    )
  ) {
    return res.status(400).json({ error: "Invalid quiz data" });
  }
  try {
    const { id } = await quizService.create({
      name: quiz.name,
      userId: userId,
    });
    const promiseAnswerAndQuestions = quiz.questions.map(async (q) => {
      const question = await questionService.create({
        question: q.question,
        quizId: id,
      });
      const answersPromises = q.answers.map(async (a) => {
        return await answerService.create({
          answer: a.answer,
          questionId: question.id,
          isCorrect: a.isCorrect,
        });
      });
      const answers = await Promise.all(answersPromises);
      return answers;
    });
    await Promise.all(promiseAnswerAndQuestions);
  } catch (error) {}

  return res.status(201).json({ quiz });
}
