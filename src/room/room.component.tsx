import { Header } from "../page-layout/header.component";
import { Deck } from "../deck/deck.component";
import { usePlayer } from "../player/player.context";
import { useEffect, useState } from "react";
import { DealerControlPanel } from "../dealer/dealer-control-panel.component";
import { VoteResult } from "../voting/vote-result.component";
import { useDealer } from "../dealer/dealer.context";
import { useOnlinePlayersList, useVoting } from "../app/app.state";
import { IIssue } from "../issue/issue.model";

export function Room() {
  const player = usePlayer()!;
  const dealer = useDealer()!;
  const [revealVotes, setRevealVotes] = useState(false);

  const [players, setPlayers] = useOnlinePlayersList();
  const [voting, setVoting] = useVoting();

  useEffect(() => {
    player
      .onStateChanged(setVoting)
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

  function reveal(issue: IIssue): void {
    if (issue.id !== voting.issue?.id) {
      return;
    }

    setRevealVotes(true);
  }

  return (
    <>
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
    </>
  );
}
