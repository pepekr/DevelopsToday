import { useState } from "react";

export function useQuizHook() {
  const MAX_QUESTIONS = 100;
  const MAX_ANSWERS = 4;
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      answers: [{ answer: "", isCorrect: true }],
    },
  ]);

  const handleQuestionChange = (index: number, text: string) => {
    const updated = [...questions];
    updated[index].question = text;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex: number, aIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex].answer = text;
    setQuestions(updated);
  };

  const handleCorrectChange = (qIndex: number, aIndex: number) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex].isCorrect = !updated[qIndex].answers[aIndex].isCorrect;
    setQuestions(updated);
  };

  const addQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions([
      ...questions,
      {
        question: "",
        answers: [{ answer: "", isCorrect: false }],
      },
    ]);
  };

  const removeQuestion = (qIndex: number) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };

  const addAnswer = (qIndex: number) => {
    const updated = [...questions];
    if (updated[qIndex].answers.length < MAX_ANSWERS) {
      updated[qIndex].answers.push({ answer: "", isCorrect: updated[qIndex].answers.length === 0 });
      setQuestions(updated);
    }
  };

  const removeAnswer = (qIndex: number, aIndex: number) => {
    const updated = [...questions];
    updated[qIndex].answers.splice(aIndex, 1);
    setQuestions(updated);
  };

  const handleLastAnswerChange = (qIndex: number) => {
  setQuestions(prev => {
    const updated = [...prev];
    const q = updated[qIndex];

    updated[qIndex] = {
      ...q,
      answers: [
        {
          ...q.answers[0],
          isCorrect: true,
        },
      ],
    };

    return updated;
  });
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quiz = {
      name: quizName,
      questions,
    };
  };

  return {
    quizName,
    questions,
    setQuizName,
    handleQuestionChange,
    handleAnswerChange,
    handleCorrectChange,
    addQuestion,
    removeQuestion,
    addAnswer,
    removeAnswer,
    handleSubmit,
    handleLastAnswerChange,
  }
}
