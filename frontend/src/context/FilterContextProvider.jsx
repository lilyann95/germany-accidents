import { FilterContext } from "./FilterContext";
import { useLocation } from "react-router-dom";

const FilterContextProvider = (props) => {
  //   const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const value = {
    // showSearch,
    // setShowSearch,
    location,
  };

  return (
    <FilterContext.Provider value={value}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
