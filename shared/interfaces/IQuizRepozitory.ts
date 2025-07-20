import { SimpleQuiz, Quiz, QuizWithoutId } from "./Quiz";

export interface IQuizRepository 
{
    create(quiz:QuizWithoutId):Promise<Quiz>
    delete(id:string):Promise<Quiz>
    findByUserId(id:string):Promise<Quiz[]>
    findFullByQuizId(id:string):Promise<SimpleQuiz|null>
}