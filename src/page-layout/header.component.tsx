import { Button, Col, Row, Space } from "antd";
import useMessage from "antd/es/message/useMessage";
import { Link, useParams } from "react-router-dom";
import { copyTextToClipboard } from "../shared/clipboard";
import { HomeOutlined } from "@ant-design/icons";

export function Header() {
  const [messageApi, contextHolder] = useMessage();
  const { id: roomId } = useParams();

  function copyToClipboard(value: string): void {
    copyTextToClipboard(value)
      .then(() => messageApi.success(`${value} was copied to a clipboard`))
      .catch(() => messageApi.error(`Couldn't copy to a clipboard`));
  }

  return (
    <div className="w-full h-full px-6 bg-white flex items-center justify-end">
      {contextHolder}
      <Row className="w-full" justify="end">
        <Col span={18}>
          <Link className="justify-self-start" to="/">
            <Button type="primary" icon={<HomeOutlined />} />
          </Link>
        </Col>
        <Col span={6}>
          <Space>
            <Button onClick={() => copyToClipboard(roomId!)}>
              Copy room hash
            </Button>
            <Button onClick={() => copyToClipboard(location.href)}>
              Copy game url
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
