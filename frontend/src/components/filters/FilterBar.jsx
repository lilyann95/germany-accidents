import Button from "../common/Button";
import District from "./District";
import AccidentTypeSelect from "./AccidentCategory";
import StateSelect from "./StateSelect";
import YearSelect from "./YearSelect";
import MonthSelect from "./MonthSelect";
import WeekDay from "./WeekDay";
import Hour from "./Hour";
import Participant from "./Participant";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const Divider = () => (
  <div className="hidden md:block w-px self-stretch bg-gray-300" />
);

const Group = ({ title, children }) => (
  <div className="flex flex-col gap-2 w-full md:w-auto">
    <h3 className="text-xs font-semibold text-gray-600 tracking-wide">
      {title}
    </h3>
    <div className="flex flex-wrap items-center gap-2">{children}</div>
  </div>
);

const FilterBar = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 rounded-2xl shadow-md p-5 my-5">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 flex-1">
        {/* Region */}
        <Group title="Region">
          <StateSelect />
          <District />
        </Group>

        <Divider />

        {/* Time */}
        <Group title="Time">
          <YearSelect />
          <MonthSelect />
          <WeekDay />
          <Hour />
        </Group>

        <Divider />

        {/* Flags */}
        <Group title="Flags">
          <AccidentTypeSelect />
          <Participant />
        </Group>
      </div>

      {/* Reset button */}
      <div className="w-full md:w-auto flex md:items-start">
        <Button
          message="Reset Filters"
          icon={faArrowsRotate}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default FilterBar;
