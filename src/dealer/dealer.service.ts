import { IIssue } from '../issue/issue.model';
import { IVotingState } from '../voting/voting.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { IMessage, IPlayerVoteMessage, IStateMessage } from '../app/app-waku-message.model';

export class DealerService {
  // TODO: get from external default value
  private votingState: IVotingState = {
    issue: null,
    results: null
  };

  constructor(private readonly node: WakuNodeService) { }

  public init(votingState: IVotingState): this {
    this.votingState = {
      issue: votingState.issue ? { ...votingState.issue } : null,
      results: {
        ...votingState.results
      }
    }

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

  public endVoting(): void {
    this.votingState.issue = null;
    this.votingState.results = null;
    this.sendState();
  }

  public revote(): void {
    this.votingState.results = {};
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
