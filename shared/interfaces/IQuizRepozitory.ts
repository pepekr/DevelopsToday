import { Quiz } from "./Quiz";

export interface IQuizRepository 
{
    create():Promise<Quiz>
    delete():Promise<void>
    findbyUserId():Promise<Quiz[]>
}