import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS after DOM is ready
if (typeof window !== "undefined") {
  AOS.init({ duration: 1200 });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
