import Title from "antd/es/typography/Title";
import { PlayerControlPanel } from "../player/player-control-panel.component";
import Markdown from "react-markdown";
import { PlayersList } from "../player/players-list.component";
import { IIssue } from "../issue/issue.model";
import { useVoting } from "../app/app.state";

function NoVoteItem() {
  return (
    <div className="h-full w-full flex-center flex-col">
      <Title level={5}>Waiting dealer to shuffle the deck 😎</Title>
      <PlayersList></PlayersList>
    </div>
  );
}

function IssueVoteComponent(props: { item: IIssue }) {
  const { item } = props;
  return (
    <div className="flex flex-col h-full">
      <Title level={3}>{item.name}</Title>
      <PlayersList />
      <div className="flex-grow overflow-auto">
        {item.description && <Markdown>{item.description}</Markdown>}
      </div>
      <PlayerControlPanel></PlayerControlPanel>
    </div>
  );
}

export function Deck() {
  const [voting] = useVoting();

  return (
    <div className="bg-white text-gray-900 h-full w-full p-6">
      <div className="h-full w-full">
        {voting.issue ? (
          <IssueVoteComponent item={voting.issue} />
        ) : (
          <NoVoteItem />
        )}
      </div>
    </div>
  );
}
