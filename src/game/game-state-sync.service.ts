import { DealerEventsService } from '../dealer/dealer-events.service';
import { IIssue } from '../issue/issue.model';
import { IVotingState } from '../voting/voting.model';
import { IPlayerVoteMessage } from '../app/app-waku-message.model';

export class GameStateSyncService {
  private state: IVotingState = {
    issue: null,
    results: null
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

  public startVoting(voteItem: IIssue): void {
    this.state.issue = voteItem;
    this.state.results = {};
    this.sendStateToNetwork();
  }

  public endVoting(): void {
    this.state.issue = null;
    this.state.results = null;
    this.sendStateToNetwork();
  }

  public revote(): void {
    this.state.results = null;
    this.sendStateToNetwork();
  }

  public enableIntervalSync(timeout: number): this {
    setInterval(() => this.sendStateToNetwork(), timeout);
    return this
  }

  private onPlayerVote(message: IPlayerVoteMessage): void {
    const voteInProgress = this.state.issue && this.state.results;

    if (!voteInProgress || message.voteFor !== this.state.issue?.id) {
      return;
    }

    if (message.voteResult === null) {
      delete this.state.results![message.voteBy];
    } else {
      this.state.results![message.voteBy] = message.voteResult
    }

    this.sendStateToNetwork();
  }

  private sendStateToNetwork(): void {
    this.dealerEventsService.sendState(this.state);
  }

}