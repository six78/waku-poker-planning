import ReactDOM from "react-dom/client";
import AppInitializer from "./AppInitializer";
import "./index.css";
import { LightNodeOptions, LightNodeProvider } from "@waku/react";
import { wakuDnsDiscovery } from "@waku/dns-discovery";
import { bootstrap } from "@libp2p/bootstrap";

const peers = [
  "/dns4/node-01.do-ams3.wakuv2.prod.statusim.net/tcp/30303/p2p/16Uiu2HAmL5okWopX7NqZWBUKVqW8iUxCEmd5GMHLVPwCgzYzQv3e",
  "/dns4/node-01.gc-us-central1-a.wakuv2.prod.statusim.net/tcp/30303/p2p/16Uiu2HAmVkKntsECaYfefR1V2yCR79CegLATuTPE6B9TxgxBiiiA",
  "/dns4/node-01.ac-cn-hongkong-c.wakuv2.prod.statusim.net/tcp/30303/p2p/16Uiu2HAm4v86W3bmT1BiH6oSPzcsSr24iDQpSN5Qa992BCjjwgrD",
];

const enrTree =
  "enrtree://ANEDLO25QVUGJOUTQFRYKWX6P4Z4GKVESBMHML7DZ6YK4LGS5FC5O@prod.wakuv2.nodes.status.im";

// Define node requirements
const NODE_REQUIREMENTS = {
  // store: 3,
  lightPush: 3,
  filter: 3,
  // relay: 3,
};

const NODE_OPTIONS: LightNodeOptions = {
  // defaultBootstrap: true,
  pingKeepAlive: 3,
  libp2p: {
    peerDiscovery: [
      //bootstrap({ list: peers }),
      wakuDnsDiscovery([enrTree], NODE_REQUIREMENTS),
    ],
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppInitializer />
);
