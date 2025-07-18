import { Response, Request } from "express";
import { FullQuiz, FullQuizWithNumber } from "../../../shared/interfaces/Quiz.js";
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
  const quiz: FullQuizWithNumber = req.body;
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
      numberOfQuestions:quiz.numberOfQuestions
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

export async function getAllQuizes(req: Request, res: Response) {
  try {
    const userId: string = res.locals.userId;
    const quizess = await quizService.findByUserId(userId);
    res.status(200).json({quizess})
  } catch (error) {
    res.status(500).json({error:"Error occured during quizess gathering"})
  }
  
}

export async function getFullQuiz(req:Request, res:Response)
{
  try {
    const quizId = req.params.id
    if(!quizId) res.status(401).json({error:"No id given"})
    const userId:string = res.locals.userId;
    const quiz = quizService.findFullByQuizId(userId);
    res.status(200).json({quiz})
  } catch (error) {
        res.status(500).json({error:"Error occured during quizess gathering"})
  } 
}
export async function deleteQuiz(req:Request, res:Response)
{
   const quizId = req.params.id
   if(!quizId) res.status(401).json({error:"No id given"})
   const userId:string = res.locals.userId;
   const quiz = await quizService.findFullByQuizId(quizId)
   if(!quiz) return res.status(401).json({error:"Quiz not found"})
  //@ts-ignore
   if(!quiz.userId === userId)
    {
      return res.status(401).json({error:"Quiz not found"})
    }
    try {
      await quizService.delete(quizId)
      res.status(200).json({message:"Quiz deleted"})
    } catch (error) {
      res.status(500).json({error:"Something went wrong"})
    }
    
  
}