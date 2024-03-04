import { useContext, useEffect, useState } from "react";
import { DealerService } from "./dealer.service";
import { AppContext } from "../app/app.context";
import { DealerContext } from "./dealer.context";
import { AddVoteItem } from "./components/add-vote-item.component";
import { VoteItemsList } from "./components/vote-items-list.component";
import { IVoteItem } from "../voting/voting.model";
import { useAppState } from "../app/app-state.context";

export function DealerControlPanel() {
  const [dealerService, setDealerService] = useState<DealerService | null>(
    null
  );
  const appContext = useContext(AppContext);
  const [voteItems, setVoteItems] = useState<IVoteItem[]>([]);
  const state = useAppState();

  useEffect(() => {
    setDealerService(new DealerService(appContext!.wakuNodeService));
  }, [appContext]);

  function submitVoting(): void {
    if (!state.voteItem) {
      return;
    }

    dealerService?.endVoting();

    // TODO: calculate results
    setVoteItems(
      voteItems.map((x) => {
        if (x.id === state.voteItem!.id) {
          x.result = 8;
          x.voteHistory = state.tempVoteResults || {};
        }

        return x;
      })
    );
  }

  if (!dealerService) {
    return <></>;
  }

  return (
    <DealerContext.Provider value={dealerService}>
      <div className="w-full h-full bg-white p-6 flex flex-col">
        <AddVoteItem
          addIssue={(issue) => setVoteItems([...voteItems, issue])}
        />
        <div className="overflow-auto">
          <VoteItemsList
            issues={voteItems}
            submitVoting={submitVoting}
          ></VoteItemsList>
        </div>
      </div>
    </DealerContext.Provider>
  );
}
