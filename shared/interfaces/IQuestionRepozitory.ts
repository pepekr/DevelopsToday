import {Question, QuestionWithoutId } from "./Question";

export interface IQuestionRepositpry
{
    create(question:QuestionWithoutId):Promise<Question>
    delete(id:string):Promise<Question>
    findByQuizId(quizId:string):Promise<Question[]>
}