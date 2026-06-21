import Dropdown from "../common/Dropdown";

const Month = ({ value, onChange, options }) => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">Month</h3>
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

export default Month;
