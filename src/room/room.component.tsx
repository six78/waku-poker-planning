import { GameStateContext } from "../app/app-state.context";
import { Header } from "../page-layout/header.component";
import { Deck } from "../deck/deck.component";
import { usePlayer } from "../player/player.context";
import { useEffect, useState } from "react";
import { DealerControlPanel } from "../dealer/dealer-control-panel.component";
import { VoteResult } from "../voting/vote-result.component";
import { useDealer } from "../dealer/dealer.context";
import { useOnlinePlayersList } from "../game/game.state";
import { IVotingState } from "../voting/voting.model";
import { IIssue } from "../issue/issue.model";

export function Room() {
  const player = usePlayer()!;
  const dealer = useDealer()!;
  const [revealVotes, setRevealVotes] = useState(false);

  const [players, setPlayers] = useOnlinePlayersList();

  const [state, setState] = useState<IVotingState>({
    issue: null,
    results: null,
  });

  useEffect(() => {
    player
      .onStateChanged(setState)
      .enableHeartBeat()
      .onPlayerOnline((player) => {
        if (players.some((participant) => participant.id === player.id)) {
          return;
        }

        setPlayers([...players, player]);
      });
  }, [player]);

  function onRevote() {
    setRevealVotes(false);
    dealer.revote();
  }

  function reveal(voteItem: IIssue): void {
    if (voteItem.id !== state.issue?.id) {
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
