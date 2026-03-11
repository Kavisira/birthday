import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// @ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";
// @ts-ignore
import confetti from "canvas-confetti";

// Make confetti available globally
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).confetti = confetti;
  AOS.init({ duration: 1200 });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
