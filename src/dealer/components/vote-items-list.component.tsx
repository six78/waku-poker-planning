import Markdown from "react-markdown";
import { Button, Card } from "antd";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { IVoteItem } from "../../voting/voting.model";
import { useDealerContext } from "../dealer.context";

export function VoteItemsList(props: { issues: IVoteItem[] }) {
  const dealer = useDealerContext();

  function startVoting(item: IVoteItem): void {
    dealer?.setVoteItem(item);
  }

  return (
    <div>
      {props.issues.map((x) => (
        <Card
          key={x.id}
          className="max-w-full mb-2"
          title={x.name}
          actions={[
            <DeleteOutlined key="delete" style={{ color: "#E02424" }} />,
            <Button
              onClick={startVoting.bind(undefined, x)}
              type="primary"
              key="setting"
            >
              Vote
            </Button>,
          ]}
          extra={
            x.url && (
              <a href={x.url} target="_blank">
                <ExportOutlined />
              </a>
            )
          }
        >
          {x.description ? (
            <Markdown>{x.description}</Markdown>
          ) : (
            "No description"
          )}
        </Card>
      ))}
    </div>
  );
}
