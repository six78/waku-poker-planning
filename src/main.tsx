import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RelayNodeProvider } from "@waku/react";

const NODE_OPTIONS = { defaultBootstrap: true };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RelayNodeProvider options={NODE_OPTIONS}>
      <App />
    </RelayNodeProvider>
  </React.StrictMode>
);
