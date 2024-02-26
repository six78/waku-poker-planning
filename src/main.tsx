import React from "react";
import ReactDOM from "react-dom/client";
import AppInitializer from "./AppInitializer";
import "./index.css";
import { RelayNodeOptions, RelayNodeProvider } from "@waku/react";

const NODE_OPTIONS: RelayNodeOptions = {
  defaultBootstrap: true,
  emitSelf: true,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RelayNodeProvider options={NODE_OPTIONS}>
    <AppInitializer />
  </RelayNodeProvider>
);
