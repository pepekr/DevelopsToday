import { IQuizRepository } from "../../../shared/interfaces/IQuizRepozitory.js";
import { Quiz, QuizWithoutId } from "../../../shared/interfaces/Quiz.js";
export class QuizService
{
    quizRepo:IQuizRepository
    constructor(quizRepo:IQuizRepository)
    {
        this.quizRepo = quizRepo
    }

    async findByUserId(id:string)
    {
        return this.quizRepo.findByUserId(id)
    }
    findFullByQuizId(id:string)
    {
        return this.quizRepo.findFullByQuizId(id)
    }
    async create(qiuz:QuizWithoutId)
    {
        return this.quizRepo.create(qiuz)
    }
    async delete(id:string )
    {
        return this.quizRepo.delete(id)
    }
}