import React, { useEffect } from 'react'
import useSingleQuizInfo from '../hooks/useSingleQuizInfo';

function Quiz() {
    const { quizInfo, error } = useSingleQuizInfo();

  if(!quizInfo && !error) 
    {
      return <div>Loading...</div>;
    }
  return (
    <div>
      {error && <div>Error: {error}</div>}
      {quizInfo && (
        <div>
          <h1>{quizInfo.name}</h1>
          {quizInfo.questions.map((question, index) => (
            <div>
              <h2>Question {index + 1}: {question.question}</h2>
              <ul>
                {question.answers.map((answer, aIndex) => (
                  <li key={aIndex}>
                    {answer.answer} {answer.isCorrect ? "(Correct)" : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Quiz
