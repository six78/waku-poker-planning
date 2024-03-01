import { useContext, useEffect, useMemo, useState } from "react";
import { DisplayState } from "./components/display-state.component";
import { AppStateContext } from "./context/app-state.context";
import "./App.css";
import { IGameState } from "./game/game-state.model";
import { PlayerEventsService } from "./player/player-events.service";
import { GameStateSyncService } from "./dealer/game-state-sync.service";
import { DealerEventsService } from "./dealer/dealer-events.service";
import { DeckControlPanel } from "./deck/deck-control-panel.component";
import { Header } from "./page-layout/header.component";
import { AppContext } from "./app/app.context";

function App() {
  const appContext = useContext(AppContext)!;

  const [state, setState] = useState<IGameState>({
    players: [],
    voteFor: null,
  });

  // TODO: в контекст
  const participantMessageService = useMemo(
    () =>
      new PlayerEventsService(
        appContext.wakuNodeService,
        appContext.userService
      ),
    [appContext]
  );

  useEffect(() => {
    if (!appContext?.userService.host) {
      return;
    }

    const sidr = new DealerEventsService(
      appContext.wakuNodeService,
      appContext.userService
    );
    const moh = new GameStateSyncService(sidr);

    moh.init().enableIntervalSync(10000);
  }, [appContext]);

  useEffect(() => {
    participantMessageService.onStateChanged(setState);
    participantMessageService.playerIsOnline();

    setTimeout(() => {
      participantMessageService.playerIsOnline();
    }, 10 * 1000);
  }, [participantMessageService]);

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
