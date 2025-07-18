import { Quiz } from "../../../shared/interfaces/Quiz";

export async function getAllQuiz(): Promise<Quiz[]> {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/quizzes`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch quizzes: ${res.statusText}`);
    }

    return (await res.json()).quizess;
  } catch (error) {
    console.error("getAllQuiz error:", error);
    return [];
  }
}
