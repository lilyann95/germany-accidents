// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FilterContext } from "../../context/FilterContext";

import Button from "../common/Button";
import { API } from "../../services/api";

const QuestionCard = ({ question, icon, url }) => {
  const { answer, setAnswer } = useContext(FilterContext);

  const answerFn = async (url) => {
    const response = await API.get(url);
    setAnswer({ question, response: response.data });
  };

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
          <Button
            message="Show Answer"
            icon={faArrowRight}
            onClick={() => answerFn(url)}
          />
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
