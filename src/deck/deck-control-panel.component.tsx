import { useContext } from "react";
import { AppContext } from "../app/app.context";
import { DealerControlPanel } from "../dealer/dealer-control-panel.component";
import { PlayerControlPanel } from "../player/player-control-panel.component";

export function DeckControlPanel() {
  const appContext = useContext(AppContext)!;

  return (
    <div className="h-full grid grid-raws-2 gap-4">
      {appContext.userService.host && <DealerControlPanel />}
      <PlayerControlPanel />
    </div>
  );
}
