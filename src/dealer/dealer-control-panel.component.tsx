import { useState } from "react";
import { AddIssue } from "./components/add-issue.component";
import { IssueList } from "./components/issue-list.component";
import { IIssue } from "../issue/issue.model";
import { useVoting } from "../app/app.state";

export function DealerControlPanel(props: {
  revealVotes: (voteItem: IIssue) => void;
}) {
  const [voting] = useVoting();
  const [issues, setIssues] = useState<IIssue[]>([]);

  function submitVoting(): void {
    if (!voting.issue) {
      return;
    }

    props.revealVotes(voting.issue);
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
      <AddIssue addIssue={(issue) => setIssues([...issues, issue])} />
      <div className="overflow-auto">
        <IssueList issues={issues} reveal={submitVoting}></IssueList>
      </div>
    </div>
  );
}
