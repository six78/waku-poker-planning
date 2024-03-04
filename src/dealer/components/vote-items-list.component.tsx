import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IVoteItem } from "../../voting/voting.model";
import { useDealerContext } from "../dealer.context";
import { useAppState } from "../../app/app-state.context";

export function VoteItemsList(props: { issues: IVoteItem[] }) {
  const { voteItem, players, tempVoteResults } = useAppState();
  const dealer = useDealerContext();

  function startVoting(item: IVoteItem): void {
    dealer?.setVoteItem(item);
  }

  function submitVoting(): void {}

  return (
    <div>
      {props.issues.map((x) => (
        <div
          key={x.id}
          className="text-gray-900 border border-sky-600 rounded p-2 mb-4 flex items-center"
        >
          {x.url ? (
            <a className="text-sky-600 grow" href={x.url}>
              {x.name}
            </a>
          ) : (
            <span className="grow">{x.name}</span>
          )}
          <Button
            className="mx-2"
            type="primary"
            danger
            ghost
            icon={<DeleteOutlined />}
          />

          {voteItem && voteItem.id === x.id ? (
            <Button onClick={startVoting.bind(undefined, x)} type="primary">
              Submit {Object.keys(tempVoteResults || {}).length}/
              {players.length}
            </Button>
          ) : (
            <Button onClick={startVoting.bind(undefined, x)} type="primary">
              Vote
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
