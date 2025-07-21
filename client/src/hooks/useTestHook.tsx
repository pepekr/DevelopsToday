import React from "react";
import { QuestionWithAnswers } from "../../../shared/interfaces/Question";

interface UserAnswers {
  [questionIndex: number]: {
    selectedAnswers: {
      index: number;
      isCorrect: boolean;
    }[];
    isCorrect: boolean;
  };
}


function useTestHook(q: QuestionWithAnswers[]) {
  const [questions, setQuestions] = React.useState<QuestionWithAnswers[]>(q);
  const [userAnswers, setUserAnswers] = React.useState<UserAnswers>({});
  const [score, setScore] = React.useState<number | null>(null);
  const [isTestEnded, setIsTestEnded] = React.useState(false);
 const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
  const answerIsCorrect = questions[questionIndex].answers[answerIndex].isCorrect;

  setUserAnswers((prev) => {
    const userAnswer = prev[questionIndex] || {
      selectedAnswers: [],
      isCorrect: false,
    };

    const alreadySelected = userAnswer.selectedAnswers.find(
      (a) => a.index === answerIndex
    );

    let newSelectedAnswers;

    if (alreadySelected) {
      // Remove it
      newSelectedAnswers = userAnswer.selectedAnswers.filter(
        (a) => a.index !== answerIndex
      );
    } else {
      // Add it
      newSelectedAnswers = [
        ...userAnswer.selectedAnswers,
        { index: answerIndex, isCorrect: answerIsCorrect },
      ];
    }

    return {
      ...prev,
      [questionIndex]: {
        selectedAnswers: newSelectedAnswers,
        isCorrect: false, // `checkAnswers` will handle actual correctness
      },
    };
  });
};
 const checkAnswers = () => {
  let correctCount = 0;

  const updatedUserAnswers: UserAnswers = {};

  questions.forEach((question, qIndex) => {
    const selected = userAnswers[qIndex]?.selectedAnswers.map(a => a.index) || [];

    const correctIndexes = question.answers
      .map((a, i) => (a.isCorrect ? i : null))
      .filter(i => i !== null) as number[];

    const selectedDetails = selected.map(index => ({
      index,
      isCorrect: question.answers[index].isCorrect
    }));

    const allSelectedAreCorrect = selectedDetails.every(ans => ans.isCorrect);
    const allCorrectAreSelected = correctIndexes.every(i => selected.includes(i));

    const isCorrect = allSelectedAreCorrect && allCorrectAreSelected;

    if (isCorrect) {
      correctCount++;
    }

    updatedUserAnswers[qIndex] = {
      selectedAnswers: selectedDetails,
      isCorrect,
    };
  });

  setUserAnswers(updatedUserAnswers);
  setScore(correctCount);
  setIsTestEnded(true);
};

  const resetTest = () => {
    setUserAnswers({});
    setScore(null);
    setIsTestEnded(false);
  };

  return {
    score,
    userAnswers,
    questions,
    checkAnswers,
    resetTest,
    handleAnswerChange,
    isTestEnded,
  };
}

export default useTestHook;
