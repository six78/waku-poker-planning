import { DealerEventsService } from '../dealer/dealer-events.service';
import { IGameState } from './game-state.model';
import { IParticipantOnlineMessage, IStartVotingMessage } from './game-message.model';

export class GameStateSyncService {
  private state: IGameState = {
    players: [],
    voteItem: null
  }

  constructor(private readonly dealerEventsService: DealerEventsService) { }

  public init(): this {
    this.dealerEventsService.onMessageReceived(message => {
      switch (message.type) {
        case '__player_online':
          this.onParticipantOnline(message);
          break;
        case '__start_voting':
          this.onStartVoting(message);
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
    if (this.state.players.some(participant => participant === message.name)) {
      return;
    }

    this.state.players.push(message.name);
    this.sendStateToNetwork();
  }
  private onStartVoting(message: IStartVotingMessage): void {
    this.state.voteItem = message.voteItem;
    this.sendStateToNetwork();
  }

  private sendStateToNetwork(): void {
    this.dealerEventsService.sendState(this.state);
  }

}