import { IQuestionRepositpry } from "../../../shared/interfaces/IQuestionRepozitory.js";
import { QuestionWithoutId } from "../../../shared/interfaces/Question.js";

export class QuestionService 
{
    questionRepo:IQuestionRepositpry;
    constructor(questionRepo:IQuestionRepositpry)
    {
        this.questionRepo = questionRepo
    }
    async create(quiz:QuestionWithoutId) {
        return this.questionRepo.create(quiz)
    }
    async delete(id:string)
    {
        return this.questionRepo.delete(id)
    }
    async findByQuizId(quizId:string)
    {
        return this.questionRepo.findByQuizId(quizId)
    }
}