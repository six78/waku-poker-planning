import Title from "antd/es/typography/Title";
import { PlayerControlPanel } from "../player/player-control-panel.component";
import Markdown from "react-markdown";
import { PlayersList } from "../player/players-list.component";
import { IIssue } from "../issue/issue.model";
import { useEffect, useState } from "react";
import { tryGetIssueDescription } from "../issue/issue-parsing.service";
import { useActiveIssue } from "../app/app.state";

function NoVoteItem() {
  return (
    <div className="h-full w-full flex-center flex-col">
      <Title level={5}>Waiting dealer to shuffle the deck 😎</Title>
      <PlayersList></PlayersList>
    </div>
  );
}

function IssueVoteComponent(props: { issue: IIssue }) {
  const { issue } = props;
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    tryGetIssueDescription(issue.titleOrUrl).then((x) =>
      setDescription(x || "Issue has no description")
    );
  }, [issue]);

  return (
    <div className="flex flex-col h-full">
      <Title level={3}>{issue.titleOrUrl}</Title>
      <div className="flex-grow overflow-auto">
        {description === null ? (
          <h3>Loading</h3>
        ) : (
          <Markdown>{description}</Markdown>
        )}
      </div>
      <PlayerControlPanel issue={issue}></PlayerControlPanel>
    </div>
  );
}

export function Deck() {
  const activeIssue = useActiveIssue();

  return (
    <div className="bg-white text-gray-900 h-full w-full p-6">
      <div className="h-full w-full">
        {activeIssue ? (
          <IssueVoteComponent issue={activeIssue} />
        ) : (
          <NoVoteItem />
        )}
      </div>
    </div>
  );
}
