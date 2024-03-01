import { useContext } from "react";
import { AppStateContext } from "../context/app-state.context";
import { Card } from "antd";

export function DisplayState() {
  const context = useContext(AppStateContext);
  const value = JSON.stringify(context, undefined, 4);

  return (
    <Card>
      <p className="whitespace-break-spaces">{value}</p>
    </Card>
  );
}
