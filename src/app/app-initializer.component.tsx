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
import { PlayerService } from "../player/player.service";
import { PlayerContext } from "../player/player.context";

const nodeFactory = new WakuNodeServiceFactory(CONTENT_TOPIC, PUBSUB_TOPIC);

export function AppInitializer() {
  const [node, setNode] = useState<WakuNodeService | null>(null);
  const [appContext, setAppContext] = useState<IAppContext | null>(null);
  const [playerService, setPlayerService] = useState<PlayerService | null>(
    null
  );

  useEffect(() => {
    nodeFactory.create().then(setNode);
  }, []);

  useEffect(() => {
    if (!node) {
      return;
    }

    const userService = new CurrentUserService();

    if (node) {
      setAppContext({
        userService,
        wakuNodeService: node,
      });

      setPlayerService(new PlayerService(node, userService));
    }
  }, [node]);

  return appContext ? (
    <AppContext.Provider value={appContext}>
      <PlayerContext.Provider value={playerService}>
        <App></App>
      </PlayerContext.Provider>
    </AppContext.Provider>
  ) : (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
