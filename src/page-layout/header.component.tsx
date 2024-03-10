import { Button, Space } from "antd";
import useMessage from "antd/es/message/useMessage";
import { useParams } from "react-router-dom";
import { copyTextToClipboard } from "../shared/clipboard";

export function Header() {
  const [messageApi, contextHolder] = useMessage();
  const { id: roomId } = useParams();

  function copyToClipboard(value: string): void {
    copyTextToClipboard(value)
      .then(() => messageApi.success(`${value} was copied to a clipboard`))
      .catch(() => messageApi.error(`Couldn't copy to a clipboard`));
  }

  return (
    <div className="w-full h-full px-4 bg-white flex items-center justify-end">
      {contextHolder}
      <Space>
        <Button onClick={() => copyToClipboard(roomId!)}>Copy room hash</Button>
        <Button onClick={() => copyToClipboard(location.href)}>
          Copy game url
        </Button>
      </Space>
    </div>
  );
}
