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
    console.log("lala");
    setDealerService(new DealerService(appContext!.wakuNodeService));
  }, []);

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
