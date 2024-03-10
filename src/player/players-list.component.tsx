import { Space, Tag } from "antd";
import { useGame } from "../app/app-state.context";
import { usePlayer } from "./player.context";
import { ReactNode } from "react";
import { useOnlinePlayersList } from "../game/game.state";

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
  const { tempVoteResults } = useGame();
  const [players] = useOnlinePlayersList();

  return (
    <Space>
      {players.map((player) => {
        const vote = (tempVoteResults || {})[player.id];
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
