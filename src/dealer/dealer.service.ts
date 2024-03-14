import { IIssue } from '../issue/issue.model';
import { IVotingState } from '../voting/voting.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { IMessage, IPlayerVoteMessage, IStateMessage } from '../app/app-waku-message.model';
import { DEFAULT_VOTING_STATE } from '../app/app.state';

export class DealerService {
  // TODO: tak sebe...
  private votingState: IVotingState = { ...DEFAULT_VOTING_STATE };

  constructor(private readonly node: WakuNodeService) { }

  public init(): this {
    this.node.subscribe(message => {
      switch (message.type) {
        case '__player_vote':
          this.onPlayerVote(message);
          break;
        default:
          break;
      }
    });

    return this;
  }

  public enableIntervalSync(timeout: number): this {
    setInterval(() => this.sendState(), timeout);
    return this
  }

  public onMessage(callback: (message: IMessage) => void) {
    this.node.subscribe(callback);
  }

  public startVoting(issue: IIssue): void {
    this.votingState.issue = issue;
    this.votingState.results = {};
    this.sendState();
  }

  public reveal(): void {
    if (!this.votingState.issue || !this.votingState.results) {
      return;
    }

    this.votingState.reveal = true;
    this.sendState();
  }

  public endVoting(): void {
    this.votingState = {
      ...DEFAULT_VOTING_STATE
    };
    this.sendState();
  }

  public revote(): void {
    this.votingState.results = {};
    this.votingState.reveal = false;
    this.sendState();
  }

  private onPlayerVote(message: IPlayerVoteMessage): void {
    const voteInProgress = this.votingState.issue && this.votingState.results;

    if (!voteInProgress || message.voteFor !== this.votingState.issue?.id) {
      return;
    }

    if (message.voteResult === null) {
      delete this.votingState.results![message.voteBy];
    } else {
      this.votingState.results![message.voteBy] = message.voteResult
    }

    this.sendState();
  }

  private sendState(): void {
    const message: IStateMessage = {
      type: '__state',
      state: this.votingState
    };

    this.node.send(message);
  }
}
