import { useState } from "react";
import { SimpleQuizWithNumber } from "../../../shared/interfaces/Quiz";

export function useQuizHook() {
  const MAX_QUESTIONS = 100;
  const MAX_ANSWERS = 4;
  const [quizName, setQuizName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
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
    updated[qIndex].answers[aIndex].isCorrect =
      !updated[qIndex].answers[aIndex].isCorrect;
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
      updated[qIndex].answers.push({
        answer: "",
        isCorrect: updated[qIndex].answers.length === 0,
      });
      setQuestions(updated);
    }
  };

  const removeAnswer = (qIndex: number, aIndex: number) => {
    const updated = [...questions];
    updated[qIndex].answers.splice(aIndex, 1);
    setQuestions(updated);
  };

  const handleLastAnswerChange = (qIndex: number) => {
    setQuestions((prev) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quiz: SimpleQuizWithNumber = {
      name: quizName,
      questions:questions,
      numberOfQuestions: questions.length,
    };
    const result = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/quizzes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify(quiz),
    });
    console.log(result.body);
    result.ok? setMessage("Quiz created successfully!") : setMessage("Error creating quiz.");
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
    message,
    setMessage,
  };
}
