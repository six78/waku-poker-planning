import { IMessage, IStartVotingMessage, IStateMessage } from '../game/game-message.model';
import { IGameState } from '../game/game-state.model';
import { PlayerEventsService } from '../player/player-events.service';

export class DealerEventsService extends PlayerEventsService {
  public sendState(state: IGameState): void {
    const message: IStateMessage = {
      type: '__state',
      state
    };

    this.node.send(message);
  }

  public sendItemToVote(voteFor: string): void {
    const message: IStartVotingMessage = {
      type: '__start_voting',
      voteFor
    };

    this.node.send(message);
  }

  public onMessageReceived(callback: (message: IMessage) => void) {
    this.node.subscribe(callback);
  }
}