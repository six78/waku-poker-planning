import { useWaku } from "@waku/react";
import { RelayNode } from "@waku/sdk";
import App from "./App";
import { WakuNodeService } from "./services/waku-node.service";
import { useEffect, useRef, useState } from "react";

function AppInitializer() {
  const { node: wakuRelayNode } = useWaku<RelayNode>();
  const [nodeIsReady, setNodeIsReady] = useState(false);

  useEffect(() => {
    wakuRelayNode?.start().then(() => {
      console.log("WAITING FOR PEERS...");
      setNodeIsReady(true);
      wakuRelayNode!.libp2p.addEventListener("peer:update", () => {
        const peers = wakuRelayNode!.relay.getMeshPeers();
        if (!nodeIsReady) {
          console.log("PEERS UPDATED", peers);
        }

        if (peers.length > 0 && !nodeIsReady) {
          setNodeIsReady(true);
        }
      });
    });
  }, [wakuRelayNode, nodeIsReady, setNodeIsReady]);

  if (!nodeIsReady) {
    return <></>;
  }

  // console.log("INITIALIZER RENDERS APP");

  const node = new WakuNodeService(wakuRelayNode!);
  node.logPeers(10000).logMessages();
  return <App node={node}></App>;
}

export default AppInitializer;
