import { Space, Tag } from "antd";
import { usePlayer } from "./player.context";
import { ReactNode } from "react";
import { useOnlinePlayersList, useVoting } from "../app/app.state";

export function PlayerTag(props: {
  children: ReactNode;
  color: "green" | "blue";
  isCurrentPlayer?: boolean;
}) {
  return (
    <Tag color={props.color}>
      {props.children} {props.isCurrentPlayer ? "(you)" : ""}
    </Tag>
  );
}

export function PlayersList() {
  // TODO: to pure component
  const currentPlayer = usePlayer();
  const [voting] = useVoting();
  const [players] = useOnlinePlayersList();

  return (
    <Space>
      {players.map((player) => {
        const vote = (voting.results || {})[player.id];
        return (
          <PlayerTag
            key={player.id}
            color={vote ? "green" : "blue"}
            isCurrentPlayer={player.id === currentPlayer?.playerId}
          >
            {player.name}
          </PlayerTag>
        );
      })}
    </Space>
  );
}
