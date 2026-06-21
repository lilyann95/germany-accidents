import Dropdown from "../common/Dropdown";

const WeekDay = ({ value, onChange, options }) => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">WeekDay</h3>
        <Dropdown
          item={options}
          itemName={"All"}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default WeekDay;
