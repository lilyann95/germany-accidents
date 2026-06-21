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
    url: "/meta/earliest-year",
  },
  {
    id: 2,
    title:
      "How many accidents involving personal injury occured in Saxony in 2023?",
    icon: faUserInjured,
    url: "/accidents/count?state_name=Sachsen&year=2023",
  },
  {
    id: 3,
    title:
      "From which year onwards is data available for North Rhine-Westphalia?",
    icon: faCalendarDays,
    url: "/meta/region/North-rhine-Westphalia",
  },
  {
    id: 4,
    title:
      "How many accidents involving pedestrians occurred in Berlin in 2023?",
    icon: faCarBurst,
    url: "/accidents/count?state_name=Berlin&year=2023",
  },
  {
    id: 5,
    title:
      "From which year onwards is data available for Mecklenburg-Western Pomerania?",
    icon: faCalendarDay,
    url: "/meta/region/Mecklenburg-Western-pomerania",
  },

  {
    id: 6,
    title: "Traffic accidents per 100, 000 registered passenger cars",
    icon: faCarOn,
    url: "/analysis/accidents-per-100k-cars",
  },
];
