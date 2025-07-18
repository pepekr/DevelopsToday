import { IQuizRepository } from "../../../shared/interfaces/IQuizRepozitory.js";
import {
  FullQuiz,
  Quiz,
  QuizWithoutId,
} from "../../../shared/interfaces/Quiz.js";
import prisma from "./prismaClient.js";
export class PrismaQuizRepository implements IQuizRepository {
  async findByUserId(userId: string): Promise<Quiz[]> {
    return prisma.quiz.findMany({
      where: { userId },
    });
  }
  async create(quiz: QuizWithoutId): Promise<Quiz> {
    return prisma.quiz.create({
      data: {
        name: quiz.name,
        userId: quiz.userId,
        numberOfQuestions: quiz.numberOfQuestions || 0
      },
    });
  }
  async delete(id: string): Promise<Quiz> {
    return prisma.quiz.delete({ where: { id: id } });
  }
  async findFullByQuizId(quizId: string): Promise<FullQuiz | null> {
    return prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { include: { answers: true } } },
    });
  }
}
