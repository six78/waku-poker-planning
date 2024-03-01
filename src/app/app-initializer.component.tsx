import { useEffect, useState } from "react";
import {
  WakuNodeService,
  WakuNodeServiceFactory,
} from "../waku/waku-node.service";
import { CONTENT_TOPIC, PUBSUB_TOPIC } from "../app.const";
import App from "../App";
import { Spin } from "antd";
import { CurrentUserService } from "../user/current-user.service";
import { AppContext, IAppContext } from "./app.context";

const nodeFactory = new WakuNodeServiceFactory(CONTENT_TOPIC, PUBSUB_TOPIC);

export function AppInitializer() {
  const [node, setNode] = useState<WakuNodeService | null>(null);
  const [appContext, setAppContext] = useState<IAppContext | null>();

  useEffect(() => {
    nodeFactory.create().then(setNode);
  }, []);

  useEffect(() => {
    if (node) {
      setAppContext({
        userService: new CurrentUserService(),
        wakuNodeService: node,
      });
    }
  }, [node]);

  return appContext ? (
    <AppContext.Provider value={appContext}>
      <App></App>
    </AppContext.Provider>
  ) : (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
