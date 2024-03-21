import { Header } from "../page-layout/header.component";
import { Deck } from "../deck/deck.component";
import { useEffect } from "react";
import { VoteResult } from "../voting/vote-result.component";
import { usePlayer } from "../player/player.context";
import { useDealer } from "../dealer/dealer.context";
import { Flex } from "antd";
import { AddIssue } from "../issue/components/add-issue.component";
import { IssueList } from "../issue/components/issue-list.component";
import { useAppState, useUpdateAppState } from "../app/app.state";

export function Room() {
  const player = usePlayer()!;
  const dealer = useDealer();
  const appState = useAppState();
  const updateAppState = useUpdateAppState();

  useEffect(() => {
    player.onStateChanged(updateAppState).enableHeartBeat();
  }, [player, updateAppState]);

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
        <div className="w-96 border-l border-gray-300">
          <Flex
            vertical
            gap="large"
            className="w-full h-full bg-white py-3 px-6"
          >
            {dealer && (
              <AddIssue addIssue={(issue) => dealer?.addIssue(issue)} />
            )}
            <IssueList></IssueList>
          </Flex>
        </div>
      </div>

      {appState.revealResults && <VoteResult />}
    </>
  );
}
