import Title from "antd/es/typography/Title";
import { PlayerControlPanel } from "../player/player-control-panel.component";
import Markdown from "react-markdown";
import { IVoteItem } from "../voting/voting.model";
import { PlayersList } from "../player/players-list.component";
import { useGame } from "../app/app-state.context";

function NoVoteItem() {
  return (
    <div className="h-full w-full flex-center flex-col">
      <Title level={5}>Waiting dealer to shuffle the deck 😎</Title>
      <PlayersList></PlayersList>
    </div>
  );
}

function IssueVoteComponent(props: { item: IVoteItem }) {
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
  const game = useGame();
  const voteItem = game.voteItem;

  return (
    <div className="bg-white text-gray-900 h-full w-full p-6">
      <div className="h-full w-full">
        {voteItem ? <IssueVoteComponent item={voteItem} /> : <NoVoteItem />}
      </div>
    </div>
  );
}
