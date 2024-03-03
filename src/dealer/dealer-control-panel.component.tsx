import { Card, Divider } from "antd";
import { SetVoteItem } from "./actions/set-vote-item.component";
import { useContext, useEffect, useState } from "react";
import { DealerService } from "./dealer.service";
import { AppContext } from "../app/app.context";
import { DealerContext } from "./dealer.context";
import { AddVoteItem } from "./components/add-vote-item.component";
import { VoteItemsList } from "./components/vote-items-list.component";
import { IVoteItem } from "../voting/voting.model";

export function DealerControlPanel() {
  const [dealerService, setDealerService] = useState<DealerService | null>(
    null
  );
  const appContext = useContext(AppContext);
  const [voteItems, setVoteItems] = useState<IVoteItem[]>([]);

  useEffect(() => {
    setDealerService(new DealerService(appContext!.wakuNodeService));
  }, [appContext]);

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
          <VoteItemsList issues={voteItems}></VoteItemsList>
        </div>
      </div>
    </DealerContext.Provider>
  );
}
