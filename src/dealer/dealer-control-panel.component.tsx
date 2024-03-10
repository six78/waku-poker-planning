import { useState } from "react";
import { AddVoteItem } from "./components/add-vote-item.component";
import { VoteItemsList } from "./components/vote-items-list.component";
import { useGame } from "../app/app-state.context";
import { IIssue } from "../issue/issue.model";

export function DealerControlPanel(props: {
  revealVotes: (voteItem: IIssue) => void;
}) {
  const game = useGame();
  const [voteItems, setVoteItems] = useState<IIssue[]>([]);

  function submitVoting(): void {
    if (!game.issue) {
      return;
    }

    props.revealVotes(game.issue);
    return;

    // dealer.endVoting();

    // // TODO: calculate results
    // setVoteItems(
    //   voteItems.map((x) => {
    //     if (x.id === game.voteItem!.id) {
    //       x.result = 8;
    //       x.voteHistory = game.tempVoteResults || {};
    //     }

    //     return x;
    //   })
    // );
  }

  return (
    <div className="w-full h-full bg-white p-6 flex flex-col">
      <AddVoteItem addIssue={(issue) => setVoteItems([...voteItems, issue])} />
      <div className="overflow-auto">
        <VoteItemsList
          issues={voteItems}
          submitVoting={submitVoting}
        ></VoteItemsList>
      </div>
    </div>
  );
}
