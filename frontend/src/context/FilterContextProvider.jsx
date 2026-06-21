import { useState } from "react";
import { FilterContext } from "./FilterContext";

const FilterContextProvider = (props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedState, setSelectedState] = useState("");
  const [accidentCount, setAccidentCount] = useState(null);
  const [answer, setAnswer] = useState(null);

  const value = {
    showSearch,
    setShowSearch,

    selectedYear,
    setSelectedYear,

    selectedState,
    setSelectedState,

    answer,
    setAnswer,

    accidentCount,
    setAccidentCount,
  };

  return (
    <FilterContext.Provider value={value}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
