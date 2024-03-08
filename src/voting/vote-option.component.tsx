import { Spin } from "antd";
import { ReactNode } from "react";

export function VoteOption(props: {
  className?: string;
  children: ReactNode;
  onClick: () => void;
  showLoader: boolean;
  active: boolean;
}) {
  return (
    <div
      onClick={props.onClick}
      className={`${
        props.className || ""
      } w-12 h-16 rounded-md border border-sky-700 flex items-center justify-center cursor-pointer relative text-center ${
        props.active ? "bg-sky-400" : ""
      }`}
    >
      {props.showLoader && (
        <div className="absolute w-full h-full flex-center bg-sky-100 rounded-md">
          <Spin></Spin>
        </div>
      )}

      {props.children}
    </div>
  );
}
