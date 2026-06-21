import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getEarliestYear = () => API.get("/meta/earliest-year");

export const getAccidentCount = (params) =>
  API.get("/accidents/count", { params });

export const getRegionMeta = (state) => API.get(`/meta/region/:${state}`);

export const getAnalysisTrafficRisk = () =>
  API.get("/analysis/accidents-per-100k-cars");

//Filters
export const getStates = () => API.get("/filters/states");

export const getmunicipality = (state) =>
  API.get(`/filters/districts?state=${state}`);

export const getYears = () => API.get("/filters/years");
export const getMonth = () => API.get("/filters/month");
export const getWeekDay = () => API.get("/filters/weekday");
export const getHours = () => API.get("/filters/hours");

export const getCategories = () => API.get("/filters/categories");

export const getParticipants = () => API.get("/filters/participants");

export const getFilterAccidentCount = (params) =>
  API.get("/filters/count", { params });
