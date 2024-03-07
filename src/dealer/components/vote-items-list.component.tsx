import { Button, Progress, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { IVoteItem } from "../../voting/voting.model";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { IGameState } from "../../game/game-state.model";
import { ReactElement } from "react";
import { useGame } from "../../app/app-state.context";
import { useDealer } from "../dealer.context";

function getDescription(item: IVoteItem, state: IGameState): ReactElement {
  const { voteItem: currentVoteItem, players, tempVoteResults } = state;
  const isCurrentVoteItem = currentVoteItem?.id === item.id;

  if (isCurrentVoteItem) {
    const completedVotesCount = Object.keys(tempVoteResults || {}).length;
    const totalVotes = players.length;

    const percent = (100 * completedVotesCount) / totalVotes;
    const text = `${Object.keys(tempVoteResults || {}).length} of ${
      players.length
    } player(s) voted`;
    return (
      <Tooltip placement="top" title={text}>
        <Progress
          percent={percent}
          status={percent === 100 ? "success" : "active"}
          showInfo={false}
        />
      </Tooltip>
    );
  }

  return <>{item.result || "No vote yet"}</>;
}

export function VoteItemsList(props: {
  issues: IVoteItem[];
  submitVoting: () => void;
}) {
  const game = useGame();
  const voteItem = game.voteItem;
  const dealer = useDealer();

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
            description={getDescription(x, game)}
          />
        </Card>
      ))}
    </div>
  );
}
