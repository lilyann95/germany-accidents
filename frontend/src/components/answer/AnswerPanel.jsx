import Button from "../common/Button";
import Explanation from "./Explanation";
import LicenseInfo from "./LicenseInfo";
import ResultCard from "./ResultCard";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AnswerPanel = () => {
  return (
    <>
      <div className="p-3 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-md text-gray-600 font-medium">Answer</h2>
          <Button message={"Clear"} icon={faXmark} />
        </div>

        <ResultCard />
        <Explanation />
        <LicenseInfo />
      </div>
    </>
  );
};

export default AnswerPanel;
