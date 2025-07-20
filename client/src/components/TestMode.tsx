import React, { use } from "react";
import { QuestionWithAnswers } from "../../../shared/interfaces/Question";
import useTestHook from "../hooks/useTestHook";

function TestMode({ questions }: { questions: QuestionWithAnswers[] }) {
  const { score, userAnswers, checkAnswers, resetTest, handleAnswerChange, isTestEnded } =
    useTestHook(questions);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Test Mode</h1>
      
      {score&&<p className="text-lg mb-4 text-center">
        Your score: {score}/{questions.length}
      </p>}
      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {index + 1}. {question.question}
          </h3>
          {isTestEnded && <span>{userAnswers[index]?.isCorrect ? "Correct" : "Incorrect"}</span>}
          <div className="space-y-3">
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className="flex items-center">
               {!isTestEnded && <input
                  type="checkbox"
                  id={`question-${index}-answer-${aIndex}`}
                  name={`question-${index}`}
                  value={answer.answer}
                  checked={userAnswers[index]?.selectedAnswers.some(ans => ans.index === aIndex)}
                  onChange={() => handleAnswerChange(index, aIndex)}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />}
                <label
                  htmlFor={!score?`question-${index}-answer-${aIndex}`:""}
                  className="ml-3 text-gray-700 cursor-pointer"
                >
                  {answer.answer}
                </label>
                {isTestEnded&& userAnswers[index]?.selectedAnswers.some(ans => ans.index === aIndex) &&<span>
                    {answer.isCorrect ? " Correct" : " Incorrect"}
                </span>}
              </div>
            ))}
          </div>
        </div>
      ))}

      {!isTestEnded?<button
        type="button"
        className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        onClick={() => checkAnswers()}
      >
        Submit Answers
      </button>:
      <button
       className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
       onClick={() => resetTest()}>
        Restart Test
        </button>}
    </div>
  );
}

export default TestMode;
