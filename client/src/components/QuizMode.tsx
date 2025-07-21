import React, { useState } from "react";
import "../styles/flipCard.css";
import { QuestionWithAnswers } from "../../../shared/interfaces/Question";
import useQuizModeHook from "../hooks/useQuizModeHook";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function QuizMode({
  questionsNotFiltered,
  setIsQuizMode,
}: {
  questionsNotFiltered: QuestionWithAnswers[];
  setIsQuizMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const questions = useQuizModeHook(questionsNotFiltered);

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quiz Mode</h1>
        <button
          onClick={() => setIsQuizMode(false)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Завершити
        </button>
      </div>

      <div className="w-full max-w-2xl flex-1 flex items-center justify-center shadow-lg rounded-lg bg-slate-700 p-4">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="w-full h-[60vh]"
        >
          {questions.map((q, index) => {
            const isFlipped = flippedCards[q.id];

            return (
              <SwiperSlide key={q.id} className="flex items-center justify-center">
                <div
                  className={`flip-container cursor-pointer w-full h-full ${
                    isFlipped ? "flipped" : ""
                  }`}
                  onClick={() => toggleCard(q.id)}
                >
                  <div className="flip-inner">
                    <div className="flip-front text-lg font-medium text-center p-6">
                      {index + 1}. {q.question}
                    </div>
                    <div className="flip-back text-base text-center p-6">
                      {q.answers.map((a, i) => (
                        <span key={a.id}>
                          {i + 1}. {a.answer}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default QuizMode;
