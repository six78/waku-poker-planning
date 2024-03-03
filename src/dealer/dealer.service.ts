import { GameStateSyncService } from '../game/game-state-sync.service';
import { IVoteItem } from '../voting/voting.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { DealerEventsService } from './dealer-events.service';

export class DealerService {
  private readonly events: DealerEventsService;
  private readonly gameStateSyncService: GameStateSyncService;
  constructor(node: WakuNodeService) {
    this.events = new DealerEventsService(node);
    this.gameStateSyncService = new GameStateSyncService(this.events);

    this.gameStateSyncService
      .init()
    //.enableIntervalSync(10000);
  }

  public setVoteItem(item: IVoteItem): void {
    this.events.sendItemToVote(item);
  }
}
