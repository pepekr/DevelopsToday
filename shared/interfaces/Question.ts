import { Answer } from "./Answer";
export interface Question {
    id: string;
    quizId: string;
    question: string;
}
export interface QuestionWithAnswers extends Question
{
    answers: Answer[]
}
