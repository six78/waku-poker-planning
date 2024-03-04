import { Space, Tag } from "antd";
import { useAppState } from "../app/app-state.context";

export function PlayersList() {
  const { players, tempVoteResults } = useAppState();

  return (
    <Space>
      {players.map((player) => {
        const vote = (tempVoteResults || {})[player.id];
        return (
          <Tag key={player.id} color={vote ? "green" : "blue"}>
            {player.name}
          </Tag>
        );
      })}
    </Space>
  );

  return;
}
