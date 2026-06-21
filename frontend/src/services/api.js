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
