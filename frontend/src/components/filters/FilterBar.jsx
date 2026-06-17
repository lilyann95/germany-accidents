import Button from "../common/Button";
import District from "./District";
import AccidentTypeSelect from "./AccidentCategory";
import StateSelect from "./StateSelect";
import YearSelect from "./YearSelect";
import MonthSelect from "./MonthSelect";
import WeekDay from "./WeekDay";
import Hour from "./Hour";
import Participant from "./Participant";
import { useState } from "react";

import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

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
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeekDay, setSelectedWeekDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedAccidentType, setSelectedAccidentType] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const resetFilters = () => {
    setSelectedState(null);
    setSelectedDistricts([]);
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedWeekDay(null);
    setSelectedHour(null);
    setSelectedAccidentType(null);
    setSelectedParticipants([]);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 rounded-2xl shadow-md p-5 my-5">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 flex-1">
        <Group title="Region">
          <StateSelect value={selectedState} onChange={setSelectedState} />
          <District value={selectedDistricts} onChange={setSelectedDistricts} />
        </Group>

        <Divider />

        <Group title="Time">
          <YearSelect value={selectedYear} onChange={setSelectedYear} />
          <MonthSelect value={selectedMonth} onChange={setSelectedMonth} />
          <WeekDay value={selectedWeekDay} onChange={setSelectedWeekDay} />
          <Hour value={selectedHour} onChange={setSelectedHour} />
        </Group>

        <Divider />

        <Group title="Flags">
          <AccidentTypeSelect
            value={selectedAccidentType}
            onChange={setSelectedAccidentType}
          />
          <Participant
            value={selectedParticipants}
            onChange={setSelectedParticipants}
          />
        </Group>
      </div>

      <div className="w-full md:w-auto flex md:items-start">
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
