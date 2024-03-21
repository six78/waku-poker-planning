import { Button, Empty, Progress, Space, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { ReactElement } from "react";
import { useDealer } from "../../dealer/dealer.context";
import { IPlayer } from "../../player/player.model";
import {
  useActiveIssue,
  useIssuesList,
  usePlayersList,
} from "../../app/app.state";
import { IIssue } from "../issue.model";
import { isUrl } from "../../shared/url";

function getDescription(
  issue: IIssue,
  isVoteInProgress: boolean,
  players: IPlayer[]
): ReactElement {
  if (isVoteInProgress) {
    const completedVotesCount = Object.keys(issue.votes || {}).length;
    const totalVotes = players.length;

    const percent = (100 * completedVotesCount) / totalVotes;
    const text = `${completedVotesCount} of ${players.length} player(s) voted`;
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

export function IssueList() {
  const dealer = useDealer();
  const players = usePlayersList();
  const issues = useIssuesList();
  const activeIssue = useActiveIssue();

  if (!issues.length) {
    return (
      <div className="flex-grow flex-center">
        <Empty
          description="No issue to vote"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <Space
      direction="vertical"
      className="overflow-auto flex-grow"
      size="middle"
      style={{ display: "flex" }}
    >
      {issues.map((x) => (
        <Card
          key={x.id}
          actions={
            dealer
              ? [
                  <DeleteOutlined key="setting" />,
                  <>
                    {activeIssue?.id === x.id ? (
                      <Button
                        onClick={() => dealer?.reveal()}
                        type="primary"
                        key="edit"
                      >
                        {dealer ? "End voting" : "Voting in progress"}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => dealer?.startVoting(x)}
                        type="primary"
                        key="edit"
                      >
                        Run
                      </Button>
                    )}
                  </>,
                ]
              : undefined
          }
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
                <Tooltip placement="top" title={x.titleOrUrl}>
                  <span className="overflow-hidden text-ellipsis">
                    {x.titleOrUrl}
                  </span>
                </Tooltip>
                {isUrl(x.titleOrUrl) && (
                  <a href={x.titleOrUrl} target="_blank">
                    <ExportOutlined />
                  </a>
                )}
              </div>
            }
            description={getDescription(x, activeIssue?.id === x.id, players)}
          />
        </Card>
      ))}
    </Space>
  );
}
