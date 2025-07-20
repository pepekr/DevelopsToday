import { SimpleQuestion, Question } from "./Question";

export interface Quiz {
    id: string;
    userId: string;
    name: string;
    numberOfQuestions?: number;
}


export interface QuizWithoutId
{
    userId:string,
    name:string
    numberOfQuestions?:number
}

export interface QuizWithQuestions extends Quiz  
{
    questions: Question[]
}
export interface SimpleQuiz
{
    name:string,
    questions:SimpleQuestion[]
}
export interface SimpleQuizWithNumber extends SimpleQuiz
{
    numberOfQuestions:number
}