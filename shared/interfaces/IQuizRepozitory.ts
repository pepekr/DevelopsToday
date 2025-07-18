import { Quiz, QuizWithQuestions } from "./Quiz";

export interface IQuizRepository 
{
    create(quiz:Quiz):Promise<Quiz>
    delete(id:string):Promise<Quiz>
    findbyUserId(id:string):Promise<Quiz[]>
}