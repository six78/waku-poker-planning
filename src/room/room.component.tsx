import { GameStateContext } from "../app/app-state.context";
import { Header } from "../page-layout/header.component";
import { Deck } from "../deck/deck.component";
import { usePlayer } from "../player/player.context";
import { useEffect, useState } from "react";
import { IGameState } from "../game/game-state.model";
import { DealerControlPanel } from "../dealer/dealer-control-panel.component";

export function Room() {
  const player = usePlayer()!;

  const [state, setState] = useState<IGameState>({
    players: [],
    voteItem: null,
    tempVoteResults: null,
  });

  useEffect(() => {
    player.onStateChanged(setState).enableHeartBeat();
  }, [player]);

  return (
    <GameStateContext.Provider value={state}>
      <div className="w-screen h-screen flex">
        <div className="flex flex-col flex-grow">
          <div className="h-14 drop-shadow-md">
            <Header></Header>
          </div>
          <div className="flex-grow overflow-auto">
            <Deck></Deck>
          </div>
        </div>
        {player.isDealer && (
          <div className="w-96 border-l border-gray-300">
            <DealerControlPanel />
          </div>
        )}
      </div>
    </GameStateContext.Provider>
  );
}
