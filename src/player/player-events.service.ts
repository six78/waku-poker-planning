import { IParticipantOnlineMessage, IPlayerVoteMessage } from '../app/app-waku-message.model';
import { IVotingState } from '../voting/voting.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { IPlayer } from './player.model';

// TODO: is it a good naming?
export class PlayerEventsService {
  constructor(
    protected readonly node: WakuNodeService
  ) { }


  public playerIsOnline(player: IPlayer): void {
    const message: IParticipantOnlineMessage = {
      type: '__player_online',
      player,
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

  public onStateChanged(callback: (state: IVotingState) => void) {
    this.node.subscribe(message => {
      if (message.type === '__state') {
        console.log('trying apply state', message.state);
        callback(message.state);
      }
    })
  }

  public onPlayerOnline(callback: (state: IPlayer) => void) {
    this.node.subscribe(message => {
      if (message.type === "__player_online") {
        callback(message.player);
      }
    })
  }
}