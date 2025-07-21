import React, { use } from "react";
import { QuestionWithAnswers } from "../../../shared/interfaces/Question";
import useTestHook from "../hooks/useTestHook";

function TestMode({ questions, setIsTestMode }: { questions: QuestionWithAnswers[], setIsTestMode: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { score, userAnswers, checkAnswers, resetTest, handleAnswerChange, isTestEnded } =
    useTestHook(questions);
  return (
    <div className="max-w-3xl mx-auto p-4 relative">
        <button
          className="absolute top-0 translate-y-[100%] left-[100%] text-2xl translate-x-[-100%] hover:scale-125 transition duration-200"
          onClick={() => setIsTestMode(false)}
        >
         𐌗
        </button>
      <h1 className="text-2xl font-bold mb-6 text-center">Test Mode</h1>
      {isTestEnded&&<p className="text-lg mb-4 text-center">Your score: {score}/{questions.length}
      </p>}
      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200"
        >
            <div className="flex items-center justify-between mb-4 ">
          <h3 className="text-lg font-semibold  text-gray-800">
            {index + 1}. {question.question}
          </h3>
          {isTestEnded && <span>{userAnswers[index]?.isCorrect ? "Correct" : "Incorrect"}</span>}
          </div>
          <div className="space-y-3 ">
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className={`flex items-center ${isTestEnded ? "relative justify-between" : ""} py-4 after:absolute after:top-[100%] after:w-full after:translate-y-[-100%] after:border-b after:border-gray-300 after:content-[''] `}>
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
                  className="ml-3 text-gray-700 cursor-pointer "
                >
                  {answer.answer}
                </label>
                {isTestEnded&& userAnswers[index]?.selectedAnswers.some(ans => ans.index === aIndex) &&<span className="block">
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
