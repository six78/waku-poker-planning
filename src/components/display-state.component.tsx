import { useContext } from "react";
import { AppStateContext } from "../context/app-state.context";

export function DisplayState() {
  const context = useContext(AppStateContext);
  const value = JSON.stringify(context, undefined, 4);

  return (
    <div className="w-1/2 border-r-2 border-blue-600 whitespace-break-spaces p-4 box-border h-screen overflow-auto">
      {value}
    </div>
  );
}
