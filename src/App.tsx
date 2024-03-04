import { useEffect, useState } from "react";
import { AppStateContext } from "./app/app-state.context";
import "./App.css";
import { IGameState } from "./game/game-state.model";
import { Deck } from "./deck/deck.component";
import { Header } from "./page-layout/header.component";
import { usePlayerContext } from "./player/player.context";
import { appConfig } from "./app/app.config";
import { DealerControlPanel } from "./dealer/dealer-control-panel.component";

function App() {
  const playerService = usePlayerContext()!;

  const [state, setState] = useState<IGameState>({
    players: [],
    voteItem: appConfig.mockedVoteCongif,
    tempVoteResults: null,
  });

  useEffect(() => {
    playerService.onStateChanged(setState).enableHeartBeat();
  }, [playerService]);

  return (
    <AppStateContext.Provider value={state}>
      <div className="w-screen h-screen flex">
        <div className="flex flex-col flex-grow">
          <div className="h-14 drop-shadow-md">
            <Header></Header>
          </div>
          <div className="flex-grow overflow-auto">
            <Deck></Deck>
          </div>
        </div>
        {playerService.isDealer && (
          <div className="w-96 border-l border-gray-300">
            <DealerControlPanel />
          </div>
        )}
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
