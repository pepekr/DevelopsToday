import { Response, Request } from "express";
import { FullQuiz } from "../../../shared/interfaces/Quiz.js";
import { QuizService } from "Services/QuizService.js";
import { PrismaQuizRepository } from "DataLayer/PrismaQuizRepository.js";
const prisma = new PrismaQuizRepository();
const quizService = new QuizService(prisma);
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
    const {id} = await quizService.create({
      name: quiz.name,
      userId: userId,
    });
    // pass then to creating questions and answers 
  } catch (error) {}

  return res.status(201).json({ quiz });
}
