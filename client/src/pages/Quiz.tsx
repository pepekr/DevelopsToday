import React from "react";
import useSingleQuizInfo from "../hooks/useSingleQuizInfo";
import TestMode from "../components/TestMode";
import QuizMode from "../components/QuizMode";

function Quiz() {
  const { quizInfo, error } = useSingleQuizInfo();
  const [isCorrectVisible, setIsCorrectVisible] = React.useState(false);
  const [isTestMode, setIsTestMode] = React.useState(false);
  const [isQuizMode, setIsQuizMode] = React.useState(false);
  if (!quizInfo) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (isTestMode) {
    return (
      <TestMode questions={quizInfo.questions} setIsTestMode={setIsTestMode} />
    );
  }
  if (isQuizMode) {
    return (
      <QuizMode
        questionsNotFiltered={quizInfo.questions}
        setIsQuizMode={setIsQuizMode}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mx-4 mb-2">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          {quizInfo.name}
        </h1>
        <div>
          <button
            onClick={() => setIsQuizMode(true)}
            className="bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-medium rounded-md px-4 mx-1 py-2"
          >
            Quiz Mode
          </button>
          <button
            onClick={() => setIsTestMode(true)}
            className="bg-gray-300 hover:bg-gray-400 transition duration-200 text-gray-800 font-medium rounded-md px-4 mx-1 py-2"
          >
            Test mode
          </button>
        </div>
      </div>
      {quizInfo.questions.map((question, index) => (
        <div
          key={index}
          className="mb-10 border border-gray-200 bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Question {index + 1}: {question.question}
            </h2>

            <button
              onClick={() => setIsCorrectVisible(!isCorrectVisible)}
              className="mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition duration-200"
            >
              {isCorrectVisible
                ? "Hide Correct Answers"
                : "Show Correct Answers"}
            </button>
          </div>
          <div className="space-y-4">
            {question.answers.map((answer, aIndex) => (
              <div
                key={aIndex}
                className="border-b border-gray-200 pb-3 text-gray-700"
              >
                <span className="block">{answer.answer}</span>
                <span
                  className={`block ${
                    isCorrectVisible ? "text-green-500" : "text-transparent"
                  } transition duration-200`}
                >
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Quiz;
