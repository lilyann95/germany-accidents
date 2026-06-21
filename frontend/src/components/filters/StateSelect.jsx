import Dropdown from "../common/Dropdown";

const StateSelect = ({ value, onChange, options }) => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">State</h3>
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

export default StateSelect;
