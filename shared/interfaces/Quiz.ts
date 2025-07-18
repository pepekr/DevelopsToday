import { FullQuestion, Question } from "./Question";

export interface Quiz {
    id: string;
    userId: string;
    name: string;
}

export interface QuizWithoutId
{
    userId:string,
    name:string
}

export interface QuizWithQuestions extends Quiz  
{
    questions: Question[]
}
export interface FullQuiz
{
    numberOfQuestions:number,
    name:string,
    questions:FullQuestion[]
}