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
const WeekDay = () => {
  return (
    <>
      <div className="">
        <h3>WeekDay</h3>
        <Dropdown item={data} />
      </div>
    </>
  );
};

export default WeekDay;
