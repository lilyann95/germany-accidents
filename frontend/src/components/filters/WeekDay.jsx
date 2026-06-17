import Dropdown from "../common/Dropdown";
const data = [
  {
    id: 1,
    title: 2024,
  },
  {
    id: 2,
    title: 2023,
  },
  {
    id: 3,
    title: 2022,
  },
  {
    id: 4,
    title: 2021,
  },
  {
    id: 5,
    title: 2020,
  },
];
const WeekDay = ({ value, onChange }) => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">WeekDay</h3>
        <Dropdown
          item={data}
          itemName={"All"}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default WeekDay;
