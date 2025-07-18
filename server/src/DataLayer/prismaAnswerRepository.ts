import { Answer, AnswerWithoutId } from "../../../shared/interfaces/Answer.js";
import { IAnswerRepository } from "../../../shared/interfaces/IAnswerRepository.js";
import prisma from "./prismaClient.js";

export class PrismaAnswerRepository implements IAnswerRepository {
  findByQuestionId(qustionId: string): Promise<Answer[]> {
    return prisma.answer.findMany({ where: { questionId: qustionId } });
  }
  create(ans: AnswerWithoutId): Promise<Answer> {
    return prisma.answer.create({
      data: {
        answer: ans.answer,
        isCorrect: ans.isCorrect,
        questionId: ans.questionId,
      },
    });
  }
  delete(id: string): Promise<Answer> {
    return prisma.answer.delete({ where: { id: id } });
  }
}
