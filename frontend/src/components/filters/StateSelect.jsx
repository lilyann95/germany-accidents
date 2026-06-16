import Dropdown from "../common/Dropdown";

const data = [
  { id: 1, title: "Baden-Württemberg" },
  { id: 2, title: "Bavaria" },
  { id: 3, title: "Berlin" },
  { id: 4, title: "Brandenburg" },
  { id: 5, title: "Bremen" },
  { id: 6, title: "Hamburg" },
  { id: 7, title: "Hesse" },
  { id: 8, title: "Lower Saxony" },
  { id: 9, title: "Mecklenburg-Vorpommern" },
  { id: 10, title: "North Rhine-Westphalia" },
  { id: 11, title: "Rhineland-Palatinate" },
  { id: 12, title: "Saarland" },
  { id: 13, title: "Saxony" },
  { id: 14, title: "Saxony-Anhalt" },
  { id: 15, title: "Schleswig-Holstein" },
  { id: 16, title: "Thuringia" },
];

const StateSelect = () => {
  return (
    <>
      <div className="">
        <h3 className="text-sm text-gray-800 font-normal">State</h3>
        <Dropdown item={data} />
      </div>
    </>
  );
};

export default StateSelect;
