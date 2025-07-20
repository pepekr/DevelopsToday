import React, { useState } from "react";
import { useQuizHook } from "../hooks/useQuizHook";

export default function QuizForm() {
  const {
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
  } = useQuizHook();

  const MAX_QUESTIONS = 100;
  const MAX_ANSWERS = 4;
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-4xl mx-auto">
      <div>
        <label className="block font-semibold mb-1">Quiz Name:</label>
        <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {questions.map((question, qIndex) => (
        <div key={qIndex} className="border p-4 rounded space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium">Question {qIndex + 1}</label>
            <button
              type="button"
              onClick={() => removeQuestion(qIndex)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </div>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter question..."
          />

          <div className="space-y-2">
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className="flex items-center gap-2">
                <input
                  type="text"
                  value={answer.answer}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, aIndex, e.target.value)
                  }
                  className="border p-2 flex-1 rounded"
                  placeholder={`Answer ${aIndex + 1}`}
                />
                {question.answers.length > 1 && (
                <input
                  type="checkbox"
                  name={`correct-${qIndex}`}
                  checked={answer.isCorrect}
                  onChange={() => handleCorrectChange(qIndex, aIndex)}
                />)}
                <span className="text-sm">Correct</span>
                {question.answers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {removeAnswer(qIndex, aIndex); handleLastAnswerChange(qIndex)}}
                    className="text-red-500 hover:text-red-700"
                    title="Remove answer"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
          </div>

          {question.answers.length < MAX_ANSWERS && (
            <button
              type="button"
              onClick={() => addAnswer(qIndex)}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Answer
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-center items-center">
        {questions.length < MAX_QUESTIONS && (
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-1"
          >
            + Add Question ({questions.length}/{MAX_QUESTIONS})
          </button>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded ml-1"
        >
          Submit Quiz
        </button>
      </div>
    </form>
  );
}
