import { useContext } from "react";
import Button from "../common/Button";
import Explanation from "./Explanation";
import LicenseInfo from "./LicenseInfo";
import ResultCard from "./ResultCard";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FilterContext } from "../../context/FilterContext";
import { questions } from "../questions/questions";

const AnswerPanel = () => {
  const { answer, setAnswer } = useContext(FilterContext);

  const clearAnswer = () => {
    setAnswer(null);
  };

  return (
    <>
      <div className="h-full p-3 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <h2 className=" text-xl text-[#964b2b] font-bold">Answer</h2>
          <Button message={"Clear"} icon={faXmark} onClick={clearAnswer} />
        </div>
        {answer && answer.response ? (
          <>
            <ResultCard
              result={answer?.response.result}
              question={answer?.question}
            />
            <Explanation explanation={answer?.response.explanation} />

            <LicenseInfo meta={answer?.response.meta} />
          </>
        ) : (
          <div className="w-full bg-gray-50 rounded-md p-2 mt-10 text-center">
            <p>Please select a question to receive answer</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AnswerPanel;
