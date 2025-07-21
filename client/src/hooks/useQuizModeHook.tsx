import React from "react";
import { QuestionWithAnswers } from "../../../shared/interfaces/Question";

function useQuizModeHook(questions: QuestionWithAnswers[]) {
  const [quizQuestions, setQuizQuestions] = React.useState<QuestionWithAnswers[]>([]);

  React.useEffect(() => {
    const formattedQuestions = questions.map((q) => ({
      ...q,
      answers: q.answers.filter((a) => a.isCorrect === true),
    }));
    setQuizQuestions(formattedQuestions);
  }, [questions]);

  return quizQuestions;
}

export default useQuizModeHook;
