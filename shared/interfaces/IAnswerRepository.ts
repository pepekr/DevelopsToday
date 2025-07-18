import { Answer, AnswerWithoutId } from "./Answer";

export interface IAnswerRepository
{
    create(ans:AnswerWithoutId):Promise<Answer>
    delete(id:string):Promise<Answer>
    findByQuestionId(qustionId:string):Promise<Answer[]>
}