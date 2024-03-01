import { IVoteItem } from './../voting/voting.model';
import { IMessage, IStartVotingMessage, IStateMessage } from '../game/game-message.model';
import { IGameState } from '../game/game-state.model';
import { WakuNodeService } from '../waku/waku-node.service';

export class DealerEventsService {
  constructor(
    protected readonly node: WakuNodeService
  ) { }
  public sendState(state: IGameState): void {
    const message: IStateMessage = {
      type: '__state',
      state
    };

    this.node.send(message);
  }

  public sendItemToVote(voteItem: IVoteItem): void {
    const message: IStartVotingMessage = {
      type: '__start_voting',
      voteItem
    };

    this.node.send(message);
  }

  public onMessageReceived(callback: (message: IMessage) => void) {
    this.node.subscribe(callback);
  }
}