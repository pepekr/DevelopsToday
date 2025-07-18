import { AnswerWithoutId } from "../../../shared/interfaces/Answer.js";
import { IAnswerRepository } from "../../../shared/interfaces/IAnswerRepository.js";

export class AnswerService {
  answerRepo: IAnswerRepository;
  constructor(answerRepo: IAnswerRepository) {
    this.answerRepo = answerRepo;
  }
  async create(ans: AnswerWithoutId) {
    return this.answerRepo.create(ans);
  }
  async delete(id: string) {
    return this.answerRepo.delete(id);
  }
  async findByQuestionId(id: string) {
    return this.answerRepo.findByQuestionId(id);
  }
}
