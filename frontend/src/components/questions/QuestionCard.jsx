// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Button from "../common/Button";

const QuestionCard = ({ question, icon }) => {
  return (
    <>
      <div className="rounded-xl shadow-md p-4 flex flex-col h-full">
        <div className="flex flex-1 items-center gap-4 p-2">
          <FontAwesomeIcon
            icon={icon}
            className="text-2xl bg-gray-200 rounded-full p-2"
          />
          <h3 className="text-sm md:text-md font-semibold">{question}</h3>
        </div>

        <div className="flex justify-center mt-4">
          <Button message="Show Answer" icon={faArrowRight} />
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
