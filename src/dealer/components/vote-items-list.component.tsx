import { Button } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { IVoteItem } from "../../voting/voting.model";
import { useDealerContext } from "../dealer.context";
import { useAppState } from "../../app/app-state.context";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { IGameState } from "../../game/game-state.model";

function getDescription(item: IVoteItem, state: IGameState): string | number {
  const { voteItem: currentVoteItem, players, tempVoteResults } = state;
  const isCurrentVoteItem = currentVoteItem?.id === item.id;

  if (isCurrentVoteItem) {
    return `${Object.keys(tempVoteResults || {}).length} of ${
      players.length
    } vote(s)`;
  }

  return item.result || "No vote yet";
}

export function VoteItemsList(props: {
  issues: IVoteItem[];
  submitVoting: () => void;
}) {
  const state = useAppState();
  const voteItem = state.voteItem;
  const dealer = useDealerContext();

  function startVoting(item: IVoteItem): void {
    dealer?.setVoteItem(item);
  }

  return (
    <div>
      {props.issues.map((x) => (
        <Card
          key={x.id}
          actions={[
            <DeleteOutlined key="setting" />,
            <>
              {voteItem?.id === x.id ? (
                <Button onClick={props.submitVoting} type="primary" key="edit">
                  End voting
                </Button>
              ) : (
                <Button
                  onClick={startVoting.bind(undefined, x)}
                  type="primary"
                  key="edit"
                >
                  Run
                </Button>
              )}
            </>,
          ]}
        >
          <Meta
            avatar={
              x.result ? (
                <CheckCircleOutlined className="text-2xl text-green-600" />
              ) : (
                <QuestionCircleOutlined className="text-2xl text-gray-300" />
              )
            }
            title={
              <div className="flex justify-between">
                {x.name}{" "}
                {x.url && (
                  <a href={x.url} target="_blank">
                    <ExportOutlined />
                  </a>
                )}
              </div>
            }
            description={getDescription(x, state)}
          />
        </Card>
      ))}
    </div>
  );
}
