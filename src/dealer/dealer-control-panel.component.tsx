import { AddIssue } from "./components/add-issue.component";
import { IssueList } from "./components/issue-list.component";
import { IIssue } from "../issue/issue.model";
import { useIssues, useVoting } from "../app/app.state";
import { Button, Space } from "antd";

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
    <Space
      direction="vertical"
      size="middle"
      className="w-full h-full bg-white p-6"
      style={{ display: "flex" }}
    >
      <AddIssue addIssue={(issue) => setIssues([...issues, issue])} />
      <IssueList issues={issues} reveal={submitVoting}></IssueList>
    </Space>
  );
}
