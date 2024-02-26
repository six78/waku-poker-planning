import { IParticipantOnlineMessage, IParticipantVoteMessage } from '../models/message.model';
import { IState } from '../models/state.model';
import { CurrentUserService } from './current-user.service';
import { WakuNodeService } from './waku-node.service';

// TODO: is it a good naming?
export class ParticipantMessageService {
  constructor(
    protected readonly node: WakuNodeService,
    protected readonly currentUserService: CurrentUserService
  ) { }


  public sendCurrentUserIsOnline(): void {
    const message: IParticipantOnlineMessage = {
      type: '__participant_online',
      name: this.currentUserService.name
    };

    this.node.send(message);
  }

  public sendCurrentUserVote(data: { voteFor: string, voteResult: number }): void {
    const message: IParticipantVoteMessage = {
      type: '__participant_vote',
      name: this.currentUserService.name,
      ...data
    };

    this.node.send(message);
  }

  public onStateChanged(callback: (state: IState) => void) {
    this.node.subscribe(message => {
      if (message.type === '__state') {
        callback(message.state);
      }
    })
  }
}