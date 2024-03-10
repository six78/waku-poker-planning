import { AddIssue } from "./components/add-issue.component";
import { IssueList } from "./components/issue-list.component";
import { IIssue } from "../issue/issue.model";
import { useIssues, useVoting } from "../app/app.state";

export function DealerControlPanel(props: {
  revealVotes: (voteItem: IIssue) => void;
}) {
  const [voting] = useVoting();
  const [issues, setIssues] = useIssues();

  function submitVoting(): void {
    if (!voting.issue) {
      return;
    }

    props.revealVotes(voting.issue);
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
