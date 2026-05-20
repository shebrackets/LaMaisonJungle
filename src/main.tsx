import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import "./index.css";
import App from "./components/App";

const container = document.getElementById("root")!;

const root: Root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);