import Dropdown from "../common/Dropdown";

const Participant = ({ value, onChange, options }) => {
  return (
    <div>
      <h3 className="text-sm text-gray-800 font-normal">Participants</h3>

      <Dropdown
        item={options}
        multiple={true}
        itemName={"All Flags"}
        badge={"p-1 bg-gray-100 rounded-full"}
        value={value}
        onChange={onChange}
        width="w-30"
      />
    </div>
  );
};

export default Participant;
