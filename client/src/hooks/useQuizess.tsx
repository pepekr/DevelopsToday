// hooks/useQuizzes.ts
import { useEffect, useState } from "react";
import { getAllQuiz } from "./getAllQuiz"
import { Quiz } from "../../../shared/interfaces/Quiz";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllQuiz();
        setQuizzes(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { quizzes, loading, error };
}
