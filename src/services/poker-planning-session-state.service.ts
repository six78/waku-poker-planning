import { HostMessageService } from './host-message.service';
import { IState } from '../models/state.model';
import { IParticipantOnlineMessage } from '../models/message.model';

// TODO: ApplicationStateSyncService ??? 
export class PokerPlanningSessionStateService {
  private state: IState = {
    participants: [],
    voteFor: null
  }

  constructor(private readonly hostMessageService: HostMessageService) { }

  public init(): this {
    console.log('HOST LISTENER ENABLED');

    this.hostMessageService.onMessageReceived(message => {
      console.log('HOST LISTENER', message);

      switch (message.type) {
        case '__participant_online':
          this.onParticipantOnline(message);
          break;
        default:
          break;
      }
    });

    this.sendStateToNetwork();
    return this;
  }

  public enableIntervalSync(timeout: number): this {
    setInterval(() => this.sendStateToNetwork(), timeout);
    return this
  }

  private onParticipantOnline(message: IParticipantOnlineMessage): void {
    if (this.state.participants.some(participant => participant === message.name)) {
      return;
    }

    this.state.participants.push(message.name);
    this.sendStateToNetwork();
  }

  private sendStateToNetwork(): void {
    this.hostMessageService.sendState(this.state);
  }
}