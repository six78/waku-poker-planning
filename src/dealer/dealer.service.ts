import { IVoteItem } from '../voting/voting.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { DealerEventsService } from './dealer-events.service';

export class DealerService {
  private readonly events: DealerEventsService;
  constructor(node: WakuNodeService) {
    this.events = new DealerEventsService(node);
  }

  public setVoteItem(item: IVoteItem): void {
    this.events.sendItemToVote(item);
  }
}
