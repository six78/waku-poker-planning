import { useEffect, useState } from "react";
import { DisplayState } from "./components/display-state.component";
import { AppStateContext } from "./app/app-state.context";
import "./App.css";
import { IGameState } from "./game/game-state.model";
import { DeckControlPanel } from "./deck/deck-control-panel.component";
import { Header } from "./page-layout/header.component";
import { usePlayerContext } from "./player/player.context";
import { appConfig } from "./app/app.config";

function App() {
  const playerService = usePlayerContext()!;

  const [state, setState] = useState<IGameState>({
    players: [],
    voteItem: appConfig.mockedVoteCongif,
    tempVoteResults: null,
  });

  useEffect(() => {
    playerService.onStateChanged(setState);
    //.enableHeartBeat();
  }, [playerService]);

  return (
    <AppStateContext.Provider value={state}>
      <div className="w-screen h-screen">
        <div className="h-14 drop-shadow-md">
          <Header></Header>
        </div>
        <div className="p-8 grid grid-cols-2 gap-4">
          <DisplayState></DisplayState>
          <DeckControlPanel></DeckControlPanel>
        </div>
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
