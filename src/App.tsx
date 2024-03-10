import { useEffect, useMemo, useState } from "react";
import { Spin } from "antd";

import { useParams } from "react-router-dom";
import { getUserDataFromLocalStorage } from "./user/current-user";
import {
  WakuNodeService,
  createWakuNodeService,
} from "./waku/waku-node.service";
import { PlayerService } from "./player/player.service";
import { PlayerContext } from "./player/player.context";
import { DealerServiceContext } from "./dealer/dealer.context";
import { DealerService } from "./dealer/dealer.service";
import { Room } from "./room/room.component";
import { createContentTopic } from "./app/app.const";
import { isCurrentUserDealerForRoom } from "./dealer/dealer-resolver";

export function App() {
  const { id: roomId } = useParams();
  const user = useMemo(getUserDataFromLocalStorage, []);

  if (!roomId || !user) {
    throw new Error(
      `Cannot initialize app for room ${roomId} and user ${JSON.stringify(
        user
      )}`
    );
  }

  const isDealer = isCurrentUserDealerForRoom(roomId);

  const [node, setNode] = useState<WakuNodeService | null>(null);
  const [playerService, setPlayerService] = useState<PlayerService | null>(
    null
  );
  const [dealerService, setDealerService] = useState<DealerService | null>(
    null
  );

  useEffect(() => {
    createWakuNodeService(createContentTopic(roomId)).then((node) => {
      if (!node) {
        return;
      }

      setDealerService(isDealer ? new DealerService(node) : null);
      setPlayerService(new PlayerService(node, { ...user, isDealer }));
      setNode(node);
    });
  }, [roomId, user, isDealer]);

  return node ? (
    <PlayerContext.Provider value={playerService}>
      <DealerServiceContext.Provider value={dealerService}>
        <Room />
      </DealerServiceContext.Provider>
    </PlayerContext.Provider>
  ) : (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
