import { DealerEventsService } from './dealer-events.service';
import { IGameState } from '../game/game-state.model';
import { IParticipantOnlineMessage } from '../game/game-message.model';

export class GameStateSyncService {
  private state: IGameState = {
    players: [],
    voteFor: null
  }

  constructor(private readonly dealerEventsService: DealerEventsService) { }

  public init(): this {
    this.dealerEventsService.onMessageReceived(message => {
      switch (message.type) {
        case '__player_online':
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
    if (this.state.players.some(participant => participant === message.name)) {
      return;
    }

    this.state.players.push(message.name);
    this.sendStateToNetwork();
  }

  private sendStateToNetwork(): void {
    this.dealerEventsService.sendState(this.state);
  }
}