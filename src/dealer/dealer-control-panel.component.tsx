import { Card } from "antd";
import { SetVoteItem } from "./actions/set-vote-item.component";
import { useContext, useEffect, useState } from "react";
import { DealerService } from "./dealer.service";
import { AppContext } from "../app/app.context";
import { DealerContext } from "./dealer.context";

export function DealerControlPanel() {
  const [dealerService, setDealerService] = useState<DealerService | null>(
    null
  );
  const appContext = useContext(AppContext);

  useEffect(() => {
    setDealerService(new DealerService(appContext!.wakuNodeService));
  }, [appContext]);

  if (!dealerService) {
    return <></>;
  }

  return (
    <DealerContext.Provider value={dealerService}>
      <Card>
        <SetVoteItem />
      </Card>
    </DealerContext.Provider>
  );
}
