import { useEffect, useMemo, useState } from "react";
import { DisplayState } from "./components/display-state.component";
import { AppStateContext } from "./context/app-state.context";
import { WakuNodeService } from "./services/waku-node.service";
import "./App.css";
import { CurrentUserService } from "./services/current-user.service";
import { IState } from "./models/state.model";
import { ParticipantMessageService } from "./services/participant-message.service";
import { PokerPlanningSessionStateService } from "./services/poker-planning-session-state.service";
import { HostMessageService } from "./services/host-message.service";

const currentUserService = new CurrentUserService();

function App(props: { node: WakuNodeService }) {
  currentUserService.validate();

  const [state, setState] = useState<IState>({
    participants: [],
    voteFor: null,
  });

  const participantMessageService = useMemo(
    () => new ParticipantMessageService(props.node, currentUserService),
    [props.node]
  );

  useEffect(() => {
    if (!currentUserService.host) {
      return;
    }

    const sidr = new HostMessageService(props.node, currentUserService);
    const moh = new PokerPlanningSessionStateService(sidr);

    moh.init().enableIntervalSync(10000);
  }, []);

  useEffect(() => {
    participantMessageService.onStateChanged(setState);
    participantMessageService.sendCurrentUserIsOnline();
  }, [participantMessageService]);

  return (
    <AppStateContext.Provider value={state}>
      <DisplayState></DisplayState>
    </AppStateContext.Provider>
  );
}

export default App;
