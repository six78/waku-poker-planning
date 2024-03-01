import App from "./App";
import {
  WakuNodeService,
  WakuNodeServiceFactory,
} from "./waku/waku-node.service";
import { useEffect, useState } from "react";
import { CONTENT_TOPIC, PUBSUB_TOPIC } from "./app.const";
import { StyleProvider } from "@ant-design/cssinjs";

const nodeFactory = new WakuNodeServiceFactory(CONTENT_TOPIC, PUBSUB_TOPIC);

function AppInitializer() {
  const [node, setNode] = useState<WakuNodeService | null>(null);
  useEffect(() => {
    nodeFactory.create(true).then(setNode);
  }, []);

  if (!node) {
    return <></>;
  }

  return (
    <StyleProvider hashPriority="high">
      <App node={node}></App>
    </StyleProvider>
  );
}

export default AppInitializer;
