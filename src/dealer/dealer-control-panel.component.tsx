import { AddIssue } from "./components/add-issue.component";
import { IIssue } from "../issue/issue.model";
import { useIssues, useVoting } from "../app/app.state";
import { Flex } from "antd";
import { IssueList } from "./components/issue-list.component";

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
    <Flex vertical gap="large" className="w-full h-full bg-white py-3 px-6">
      <AddIssue addIssue={(issue) => setIssues([...issues, issue])} />
      <IssueList issues={issues} reveal={submitVoting}></IssueList>
    </Flex>
  );
}
