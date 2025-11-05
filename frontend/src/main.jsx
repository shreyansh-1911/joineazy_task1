import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// ✅ Initialize default courses (LLM, ADS, CV, TOC)
const defaultCourses = [
  { id: 1, name: "LLM" },
  { id: 2, name: "ADS" },
  { id: 3, name: "CV" },
  { id: 4, name: "TOC" },
];

// Only add if not already present
if (!localStorage.getItem("courses")) {
  localStorage.setItem("courses", JSON.stringify(defaultCourses));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
