import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Index.css";
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ height: "100%" }}>
      <App />
    </div>
  </StrictMode>
);
