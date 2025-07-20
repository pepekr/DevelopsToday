export interface Answer {
    id: string;
    questionId: string;
    answer: string;
    isCorrect: boolean;
}
export interface AnswerWithoutId
{
    questionId: string;
    answer: string;
    isCorrect: boolean;
}
export interface SimpleAnswer{
    answer: string;
    isCorrect: boolean;
}