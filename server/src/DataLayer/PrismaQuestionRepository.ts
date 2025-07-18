import { IQuestionRepositpry } from "../../../shared/interfaces/IQuestionRepozitory.js";
import {
  QuestionWithoutId,
  Question,
} from "../../../shared/interfaces/Question.js";
import prisma from "./prismaClient.js";
export class PrismaQuestionRepository implements IQuestionRepositpry {
  create(question: QuestionWithoutId): Promise<Question> {
    return prisma.question.create({
      data: {
        quizId: question.quizId,
        question: question.question,
      },
    });
  }

  delete(id: string): Promise<Question> {
    return prisma.question.delete({ where: { id: id } });
  }

  findByQuizId(quizId: string): Promise<Question[]> {
    return prisma.question.findMany({ where: { quizId: quizId } });
  }
}
