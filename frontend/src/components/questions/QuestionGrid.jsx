import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { questions } from "./questions.js";

const QuestionGrid = () => {
  return (
    <>
      <div className="h-full rounded-2xl shadow-md p-5 mb-5">
        <h1 className="text-xl text-[#964b2b] font-bold">Choose a question</h1>
        <h5 className="text-md text-gray-600">
          Click on a question card below to see the answer and details
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question.title}
              icon={question.icon}
              url={question.url}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionGrid;
