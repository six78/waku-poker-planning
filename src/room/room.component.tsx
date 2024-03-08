import { GameStateContext } from "../app/app-state.context";
import { Header } from "../page-layout/header.component";
import { Deck } from "../deck/deck.component";
import { usePlayer } from "../player/player.context";
import { useEffect, useState } from "react";
import { IGameState } from "../game/game-state.model";
import { DealerControlPanel } from "../dealer/dealer-control-panel.component";
import { VoteResult } from "../voting/vote-result.component";
import { useDealer } from "../dealer/dealer.context";
import { IVoteItem } from "../voting/voting.model";

export function Room() {
  const player = usePlayer()!;
  const dealer = useDealer()!;
  const [revealVotes, setRevealVotes] = useState(false);

  const [state, setState] = useState<IGameState>({
    players: [],
    voteItem: null,
    tempVoteResults: null,
  });

  useEffect(() => {
    player.onStateChanged(setState).enableHeartBeat();
  }, [player]);

  function onRevote() {
    setRevealVotes(false);
    dealer.revote();
  }

  function reveal(voteItem: IVoteItem): void {
    if (voteItem.id !== state.voteItem?.id) {
      return;
    }

    setRevealVotes(true);
  }

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
            <DealerControlPanel revealVotes={reveal} />
          </div>
        )}
      </div>

      {revealVotes && <VoteResult onRevote={onRevote}></VoteResult>}
    </GameStateContext.Provider>
  );
}
