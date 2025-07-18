import { Question } from "./Question";

export interface Quiz {
    id: string;
    userId: string;
    name: string;
}

export interface QuizWithQuestions extends Quiz  
{
    questions: Question[]
}
