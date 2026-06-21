import Dropdown from "../common/Dropdown";

const Hour = ({ value, onChange, options }) => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">Hour</h3>
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

export default Hour;
