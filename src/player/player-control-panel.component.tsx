import { Card, Spin } from "antd";
import { useAppState } from "../app/app-state.context";
import { ReactNode, useState } from "react";
import { usePlayerContext } from "./player.context";

const votes = [1, 2, 3, 5, 8, 13, 21, 34, 50];

function VoteOption(props: {
  children: ReactNode;
  onClick: () => void;
  showLoader: boolean;
  active: boolean;
}) {
  return (
    <div
      onClick={props.onClick}
      className={`w-12 h-16 rounded-md border border-sky-700 flex items-center justify-center cursor-pointer relative ${
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

export function PlayerControlPanel() {
  const { voteItem, tempVoteResults } = useAppState();
  const playerService = usePlayerContext()!;
  const statePlayerVote = (tempVoteResults || {})[playerService.playerId];
  const [lastPlayerVote, setLastPlayerVote] = useState<number | null>(null);

  function handleClick(value: number): void {
    const isClickOnTheActiveVoteCard =
      value === statePlayerVote && statePlayerVote === lastPlayerVote;
    const vote = isClickOnTheActiveVoteCard ? null : value;

    playerService.vote(voteItem!.id, vote);
    setLastPlayerVote(vote);
  }

  return (
    <Card>
      {voteItem && (
        <div>
          <h3>Vote for {voteItem.name}</h3>
          <div className="grid grid-cols-12">
            {votes.map((x) => (
              <VoteOption
                onClick={handleClick.bind(undefined, x)}
                key={x}
                showLoader={
                  x === lastPlayerVote && lastPlayerVote !== statePlayerVote
                }
                active={
                  statePlayerVote === lastPlayerVote && x === statePlayerVote
                }
              >
                {x}
              </VoteOption>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
