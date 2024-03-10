import { Button, Progress, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { ReactElement } from "react";
import { useDealer } from "../dealer.context";
import { IPlayer } from "../../player/player.model";
import { useOnlinePlayersList, useVoting } from "../../app/app.state";
import { IIssue } from "../../issue/issue.model";
import { IVotingState } from "../../voting/voting.model";

function getDescription(
  issue: IIssue,
  voting: IVotingState,
  players: IPlayer[]
): ReactElement {
  const { issue: currentVoteItem, results: tempVoteResults } = voting;
  const isCurrentVoteItem = currentVoteItem?.id === issue.id;

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

  return <>{issue.result || "No vote yet"}</>;
}

export function IssueList(props: { issues: IIssue[]; reveal: () => void }) {
  const [players] = useOnlinePlayersList();
  const [game] = useVoting();
  const issue = game.issue;
  const dealer = useDealer();

  function startVoting(item: IIssue): void {
    dealer?.startVoting(item);
  }

  return (
    <div>
      {props.issues.map((x) => (
        <Card
          key={x.id}
          actions={[
            <DeleteOutlined key="setting" />,
            <>
              {issue?.id === x.id ? (
                <Button onClick={props.reveal} type="primary" key="edit">
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
            description={getDescription(x, game, players)}
          />
        </Card>
      ))}
    </div>
  );
}
