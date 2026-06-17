import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Button = ({ message, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-end bg-white px-4 py-2 border border-gray-300 text-red-900 hover:bg-[#964b2b] hover:text-white transition duration-500 rounded-md cursor-pointer"
    >
      {message}

      <FontAwesomeIcon icon={icon} className="text-md cursor-pointer ml-2" />
    </button>
  );
};

export default Button;
