import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div className="px-4 sm:px-[3vw] md:px-[5vw] lg:px-[7vw] bg-[#964b2b]">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-2 rounded-2xl py-4 mx-5">
        <FontAwesomeIcon
          icon={faCarSide}
          className="text-3xl mr-3 text-white cursor-pointer"
        />
        <div>
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Germany Traffic Accident Query Service System
          </h2>
          <h6 className="text-white text-sm opacity-80">
            Instant answers from Official dataset for predefined questions
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Header;
