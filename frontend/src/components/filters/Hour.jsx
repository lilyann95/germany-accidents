import Dropdown from "../common/Dropdown";
const data = [
  {
    id: 1,
    title: 2024,
  },
  {
    id: 1,
    title: 2023,
  },
  {
    id: 1,
    title: 2022,
  },
  {
    id: 1,
    title: 2021,
  },
  {
    id: 1,
    title: 2020,
  },
];
const Hour = () => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">Hour</h3>
        <Dropdown item={data} itemName={"All"} />
      </div>
    </>
  );
};

export default Hour;
