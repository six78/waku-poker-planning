import { GameStateSyncService } from '../game/game-state-sync.service';
import { IVoteItem } from '../voting/voting.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { DealerEventsService } from './dealer-events.service';

// TODO: возможно этот класс не нужон
export class DealerService {
  private readonly events: DealerEventsService;
  private readonly gameStateSyncService: GameStateSyncService;
  constructor(node: WakuNodeService) {
    this.events = new DealerEventsService(node);
    this.gameStateSyncService = new GameStateSyncService(this.events);

    this.gameStateSyncService
      .init()
      .enableIntervalSync(10000);
  }

  public setVoteItem(item: IVoteItem): void {
    this.gameStateSyncService.startVoting(item);
  }

  public endVoting(): void {
    this.gameStateSyncService.endVoting();
  }

  public revote(): void {
    this.gameStateSyncService.revote();
  }
}
