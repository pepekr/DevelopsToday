import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullQuiz } from "../../../shared/interfaces/Quiz";

function useSingleQuizInfo() {
  const [error, setError] = useState<string | null>(null);
  const [quizInfo, setQuizInfo] = useState<FullQuiz | null>(null);
  const quizId = useParams().id;
  useEffect(() => {
    const fetchQuizInfo = async () => {
      const result = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/quizzes/${quizId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      setQuizInfo(data.quiz);
      if (!result.ok) {
        setError("Failed to fetch quiz info");
        setQuizInfo(null);
  }
    };
    fetchQuizInfo();
  }, [quizId]);
 
  return {
    quizInfo,
    error,
  };
}

export default useSingleQuizInfo;
