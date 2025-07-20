import { Answer, SimpleAnswer } from "./Answer";
export interface Question {
    id: string;
    quizId: string;
    question: string;
}

export interface QuestionWithoutId
{
    quizId:string,
    question:string
}
export interface QuestionWithAnswers extends Question
{
    answers: Answer[]
}

export interface SimpleQuestion
{
    question:string,
    answers: SimpleAnswer[]
}
