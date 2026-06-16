import {
  faCalendar,
  faUserInjured,
  faCalendarDays,
  faCalendarDay,
  faCarBurst,
  faCarOn,
} from "@fortawesome/free-solid-svg-icons";

export const questions = [
  {
    id: 1,
    title: "What is the earliest accident year in the complete dataset?",
    icon: faCalendar,
  },
  {
    id: 2,
    title:
      "How many accidents involving personal injury occured in Saxony in 2023?",
    icon: faUserInjured,
  },
  {
    id: 3,
    title:
      "From which year onwards is data available for North Rhine-Westphalia?",
    icon: faCalendarDays,
  },
  {
    id: 4,
    title:
      "How many accidents involving pedestrians occurred in Berlin in 2023?",
    icon: faCarBurst,
  },
  {
    id: 5,
    title:
      "From which year onwards is data available for Mecklenburg-Western Pomerania?",
    icon: faCalendarDay,
  },

  {
    id: 6,
    title: "Traffic accidents per 100, 000 registered passenger cars",
    icon: faCarOn,
  },
];
