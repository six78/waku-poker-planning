import { useWaku } from "@waku/react";
import { RelayNode } from "@waku/sdk";
import App from "./App";
import { WakuNodeService } from "./services/waku-node.service";
import { useEffect, useState } from "react";

function AppInitializer() {
  const { node: wakuRelayNode } = useWaku<RelayNode>();
  const [nodeIsReady, setNodeIsReady] = useState(false);

  useEffect(() => {
    wakuRelayNode?.start().then(() => setNodeIsReady(true));
  }, [wakuRelayNode]);

  if (!nodeIsReady) {
    return <></>;
  }

  const node = new WakuNodeService(wakuRelayNode!);
  node.logPeers(10000).logMessages();
  return <App node={node}></App>;
}

export default AppInitializer;
