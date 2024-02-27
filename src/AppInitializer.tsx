import App from "./App";
import {
  WakuNodeService,
  WakuNodeServiceFactory,
} from "./waku/waku-node.service";
import { useEffect, useState } from "react";
import { CONTENT_TOPIC, PUBSUB_TOPIC } from "./app.const";

const nodeFactory = new WakuNodeServiceFactory(CONTENT_TOPIC, PUBSUB_TOPIC);

function AppInitializer() {
  console.log("INIT");
  const [node, setNode] = useState<WakuNodeService | null>(null);
  useEffect(() => {
    nodeFactory.create().then(setNode);
  }, []);

  return node ? <App node={node}></App> : <></>;
}

export default AppInitializer;
