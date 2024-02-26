import { IMessage, IParticipantVoteMessage, IStartVotingMessage, IStateMessage } from '../models/message.model';
import { IState } from '../models/state.model';
import { ParticipantMessageService } from './participant-message.service';

export class HostMessageService extends ParticipantMessageService {
  public sendState(state: IState): void {
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

  public sendCurrentUserVote(data: { voteFor: string, voteResult: number }): void {
    const message: IParticipantVoteMessage = {
      type: '__participant_vote',
      name: this.currentUserService.name,
      ...data
    };

    this.node.send(message);
  }

  public onMessageReceived(callback: (message: IMessage) => void) {
    this.node.subscribe(callback);
  }
}