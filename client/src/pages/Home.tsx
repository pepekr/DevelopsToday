import React from 'react';
import { useQuizzes } from '../hooks/useQuizess';

function Home() {
  const { quizzes, loading, error } = useQuizzes();

  const handleQuizClick = (quizId: string) => {
    console.log('Quiz clicked:', quizId);
    // You could also navigate somewhere, e.g.:
    // navigate(`/quizzes/${quizId}`);
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    return <p className="text-center text-gray-500 text-lg flex items-center justify-center h-screen">You haven't created any quizzes yet.</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((q) => (
        <div
          key={q.id}
          onClick={() => handleQuizClick(q.id)}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
        >
          <h2 className="text-xl font-semibold text-blue-600">{q.name}</h2>
          <p className="text-gray-600">Questions: {q.numberOfQuestions}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
