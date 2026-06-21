import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FilterContextProvider from "./context/FilterContextProvider";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </StrictMode>,
);
