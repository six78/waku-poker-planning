import { Space, Tag } from "antd";
import { useGame } from "../app/app-state.context";
import { usePlayer } from "./player.context";

export function PlayersList() {
  const currentPlayer = usePlayer();
  const { players, tempVoteResults } = useGame();

  return (
    <Space>
      {players.map((player) => {
        const vote = (tempVoteResults || {})[player.id];
        return (
          <Tag key={player.id} color={vote ? "green" : "blue"}>
            {player.name} {player.id === currentPlayer?.playerId ? "(you)" : ""}
          </Tag>
        );
      })}
    </Space>
  );
}
