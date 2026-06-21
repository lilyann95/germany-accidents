import Dropdown from "../common/Dropdown";

const AccidentCategory = ({ value, onChange, options }) => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">Accidents Type</h3>
        <Dropdown
          item={options}
          itemName={"Categories"}
          value={value}
          onChange={onChange}
          width="w-40"
        />
      </div>
    </>
  );
};

export default AccidentCategory;
