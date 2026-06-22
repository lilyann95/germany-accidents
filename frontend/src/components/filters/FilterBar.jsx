import { useState, useEffect, useContext } from "react";
import Button from "../common/Button";
import Municipality from "./Municipality.jsx";
import AccidentTypeSelect from "./AccidentCategory";
import StateSelect from "./StateSelect";
import YearSelect from "./YearSelect";
import MonthSelect from "./MonthSelect";
import WeekDay from "./WeekDay";
import Hour from "./Hour";
import Participant from "./Participant";
import { faArrowsRotate, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  getStates,
  getYears,
  getMonth,
  getmunicipality,
  getCategories,
  getParticipants,
  getFilterAccidentCount,
  getWeekDay,
  getHours,
} from "../../services/api.js";
import { FilterContext } from "../../context/FilterContext.jsx";

const Divider = () => (
  <div className="hidden md:block w-px self-stretch bg-gray-300" />
);

const Group = ({ title, children }) => (
  <div className="flex flex-col gap-2 w-full md:w-auto">
    <h3 className="text-md font-semibold text-gray-600 tracking-wide">
      {title}
    </h3>
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
);

const FilterBar = () => {
  const { answer, setAnswer } = useContext(FilterContext);
  //Available options
  const [states, setStates] = useState([]);
  const [years, setYears] = useState([]);
  const [hours, setHours] = useState([]);
  const [months, setMonths] = useState([]);
  const [weekdays, setWeekDays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [municipality, setMunicipality] = useState([]);

  //Current option
  const [selectedState, setSelectedState] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeekDay, setSelectedWeekDay] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedAccidentType, setSelectedAccidentType] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const showResults = async () => {
    const response = await getFilterAccidentCount({
      state: selectedState,
      year: selectedYear,
      month: selectedMonth,
      weekday: selectedWeekDay,
      hour: selectedHour,
      category: selectedAccidentType,
      participants: selectedParticipants.join(","),
    });
    setAnswer({ response: response.data });
  };

  const resetFilters = () => {
    setSelectedAccidentType(null);
    setSelectedParticipants([]);
    setSelectedState(null);
    setSelectedMunicipality([]);
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedWeekDay(null);
    setSelectedHour(null);
  };

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [
          statesRes,
          yearsRes,
          monthRes,
          weekDayRes,
          hoursRes,
          categoriesRes,
          participantsRes,
        ] = await Promise.all([
          getStates(),
          getYears(),
          getMonth(),
          getWeekDay(),
          getHours(),
          getCategories(),
          getParticipants(),
        ]);

        setStates(statesRes.data.result);
        setYears(yearsRes.data.result);
        setMonths(monthRes.data.result);
        setHours(hoursRes.data.result);
        setWeekDays(weekDayRes.data.result);
        setCategories(categoriesRes.data.result);
        setParticipants(participantsRes.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    loadFilters();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 rounded-2xl shadow-md p-5 my-5">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 flex-1">
        <Group title="Region">
          <StateSelect
            options={states}
            value={selectedState}
            onChange={setSelectedState}
          />
        </Group>

        <Divider />

        <Group title="Time">
          <YearSelect
            options={years}
            value={selectedYear}
            onChange={setSelectedYear}
          />
          <MonthSelect
            options={months}
            value={selectedMonth}
            onChange={setSelectedMonth}
          />
          <WeekDay
            options={weekdays}
            value={selectedWeekDay}
            onChange={setSelectedWeekDay}
          />
          <Hour
            options={hours}
            value={selectedHour}
            onChange={setSelectedHour}
          />
        </Group>

        <Divider />

        <Group title="Flags">
          <AccidentTypeSelect
            options={categories}
            value={selectedAccidentType}
            onChange={setSelectedAccidentType}
          />
          <Participant
            options={participants}
            value={selectedParticipants}
            onChange={setSelectedParticipants}
          />
        </Group>
      </div>

      <div className="w-full md:w-auto flex md:items-start">
        <Button
          message="Results"
          icon={faArrowDown}
          className="w-full md:w-auto"
          onClick={showResults}
        />
        <Button
          message="Reset Filters"
          icon={faArrowsRotate}
          className="w-full md:w-auto"
          onClick={resetFilters}
        />
      </div>
    </div>
  );
};

export default FilterBar;
