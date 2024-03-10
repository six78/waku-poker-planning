import { DealerEventsService } from '../dealer/dealer-events.service';
import { IGameState } from './game-state.model';
import { IPlayerVoteMessage } from './game-message.model';
import { IVoteItem } from '../voting/voting.model';

export class GameStateSyncService {
  private state: IGameState = {
    players: [],
    voteItem: null,
    tempVoteResults: null
  }

  constructor(private readonly dealerEventsService: DealerEventsService) { }

  public init(): this {
    this.dealerEventsService.onMessageReceived(message => {
      switch (message.type) {
        case '__player_vote':
          this.onPlayerVote(message);
          break;
        default:
          break;
      }
    });

    this.sendStateToNetwork();
    return this;
  }

  public startVoting(voteItem: IVoteItem): void {
    this.state.voteItem = voteItem;
    this.state.tempVoteResults = {};
    this.sendStateToNetwork();
  }

  public endVoting(): void {
    this.state.voteItem = null;
    this.state.tempVoteResults = null;
    this.sendStateToNetwork();
  }

  public revote(): void {
    this.state.tempVoteResults = null;
    this.sendStateToNetwork();
  }

  public enableIntervalSync(timeout: number): this {
    setInterval(() => this.sendStateToNetwork(), timeout);
    return this
  }

  private onPlayerVote(message: IPlayerVoteMessage): void {
    const voteInProgress = this.state.voteItem && this.state.tempVoteResults;

    if (!voteInProgress || message.voteFor !== this.state.voteItem?.id) {
      return;
    }

    if (message.voteResult === null) {
      delete this.state.tempVoteResults![message.voteBy];
    } else {
      this.state.tempVoteResults![message.voteBy] = message.voteResult
    }

    this.sendStateToNetwork();
  }

  private sendStateToNetwork(): void {
    this.dealerEventsService.sendState(this.state);
  }

}