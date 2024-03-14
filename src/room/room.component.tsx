import { Header } from "../page-layout/header.component";
import { Deck } from "../deck/deck.component";
import { useEffect, useState } from "react";
import { DealerControlPanel } from "../dealer/dealer-control-panel.component";
import { VoteResult } from "../voting/vote-result.component";
import { useIssues, useOnlinePlayersList, useVoting } from "../app/app.state";
import { IIssue } from "../issue/issue.model";
import { VoteValue } from "../voting/voting.model";
import { usePlayer } from "../player/player.context";
import { useDealer } from "../dealer/dealer.context";

export function Room() {
  const player = usePlayer()!;
  const dealer = useDealer();
  const setPlayers = useOnlinePlayersList()[1];
  const [voting, setVoting] = useVoting();
  const [issues, setIssues] = useIssues();

  const [revealVotes, setRevealVotes] = useState(false);

  // TODO:: default voiting state
  useEffect(() => {
    dealer?.init(voting).enableIntervalSync(10000);
  }, [dealer]);

  useEffect(() => {
    player
      ?.onStateChanged(setVoting)
      .enableHeartBeat()
      .onPlayerOnline((player) => {
        setPlayers((players) => {
          if (players.some((participant) => participant.id === player.id)) {
            return players;
          }
          return [...players, player];
        });
      });
  }, [player, setPlayers, setVoting]);

  function revote() {
    setRevealVotes(false);
    dealer?.revote();
  }

  function reveal(issue: IIssue): void {
    if (issue.id !== voting.issue?.id) {
      return;
    }

    setRevealVotes(true);
  }

  function submit(result: VoteValue): void {
    setRevealVotes(false);
    dealer?.endVoting();
    setIssues(
      issues.map((x) => {
        if (x.id === voting.issue?.id) {
          return {
            ...x,
            result: `${result}`,
          };
        }

        return x;
      })
    );
  }

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="flex flex-col overflow-hidden flex-grow">
          <div className="h-14 drop-shadow-md flex-shrink-0">
            <Header></Header>
          </div>
          <div className="flex-grow overflow-auto">
            <Deck></Deck>
          </div>
        </div>
        {dealer && (
          <div className="w-96 border-l border-gray-300">
            <DealerControlPanel revealVotes={reveal} />
          </div>
        )}
      </div>

      {revealVotes && <VoteResult revote={revote} submit={submit}></VoteResult>}
    </>
  );
}
