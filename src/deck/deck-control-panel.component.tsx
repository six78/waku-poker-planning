import { PlayerControlPanel } from "../player/player-control-panel.component";

export function DeckControlPanel() {
  return (
    <div className="h-full grid grid-raws-2 gap-4">
      <PlayerControlPanel />
    </div>
  );
}
