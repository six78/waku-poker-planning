import { IParticipantOnlineMessage, IPlayerVoteMessage } from '../game/game-message.model';
import { IGameState } from '../game/game-state.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { PlayerName } from './player.model';

// TODO: is it a good naming?
export class PlayerEventsService {
  constructor(
    protected readonly node: WakuNodeService
  ) { }


  public playerIsOnline(name: PlayerName): void {
    const message: IParticipantOnlineMessage = {
      type: '__player_online',
      name: name
    };

    this.node.send(message);
  }

  public sendVote(data: Omit<IPlayerVoteMessage, 'type'>): void {
    const message: IPlayerVoteMessage = {
      type: '__player_vote',
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