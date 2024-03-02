import { Card } from "antd";
import { useAppState } from "../app/app-state.context";
import { ReactNode } from "react";
import { usePlayerContext } from "./player.context";

const votes = [1, 2, 3, 5, 8, 13, 21, 34, 50];

function VoteOption(props: { children: ReactNode; onClick: () => void }) {
  return (
    <div
      onClick={props.onClick}
      className="w-12 h-16 rounded-md border border- border-sky-700 flex items-center justify-center cursor-pointer"
    >
      {props.children}
    </div>
  );
}

export function PlayerControlPanel() {
  const { voteItem } = useAppState();
  const playerService = usePlayerContext()!;

  function handleClick(value: number): void {
    playerService.vote(voteItem!.id, value);
  }

  return (
    <Card>
      {voteItem && (
        <div>
          <h3>Vote for {voteItem.name}</h3>
          <div className="grid grid-cols-12">
            {votes.map((x) => (
              <VoteOption onClick={handleClick.bind(undefined, x)} key={x}>
                {x}
              </VoteOption>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
