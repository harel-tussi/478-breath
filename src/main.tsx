import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BreathProvider } from "./contexts/breath";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BreathProvider>
      <App />
    </BreathProvider>
  </React.StrictMode>
);
