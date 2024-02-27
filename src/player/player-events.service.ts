import { IParticipantOnlineMessage, IParticipantVoteMessage } from '../game/game-message.model';
import { IGameState } from '../game/game-state.model';
import { CurrentUserService } from '../user/current-user.service';
import { WakuNodeService } from '../waku/waku-node.service';

// TODO: is it a good naming?
export class PlayerEventsService {
  constructor(
    protected readonly node: WakuNodeService,
    protected readonly currentUserService: CurrentUserService
  ) { }


  public playerIsOnline(): void {
    const message: IParticipantOnlineMessage = {
      type: '__player_online',
      name: this.currentUserService.name
    };

    this.node.send(message);
  }

  public sendVote(data: { voteFor: string, voteResult: number }): void {
    const message: IParticipantVoteMessage = {
      type: '__player_vote',
      name: this.currentUserService.name,
      ...data
    };

    this.node.send(message);
  }

  public onStateChanged(callback: (state: IGameState) => void) {
    this.node.subscribe(message => {
      if (message.type === '__state') {
        console.log('trying apply state', message.state);
        callback(message.state);
      }
    })
  }
}