import { FullQuestion, Question } from "./Question";

export interface Quiz {
    id: string;
    userId: string;
    name: string;
    numberOfQuestions?: string;
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
    name:string,
    questions:FullQuestion[]
}
export interface FullQuizWithNumber extends FullQuiz
{
    numberOfQuestions:number
}