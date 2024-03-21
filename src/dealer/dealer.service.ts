import { IIssue } from '../issue/issue.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { IPlayerOnlineMessage, IPlayerVoteMessage } from '../app/app-waku-message.model';
import { IAppState, createDefaultAppState } from '../app/app.state';
import { Estimation } from '../voting/voting.model';


// TODO: why this decorator not working?
// function NetworkSync(target: DealerService, _propertyKey: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;

//   descriptor.value = function (...args: unknown[]) {
//     console.log('CALLING', descriptor);
//     const result = originalMethod.apply(target, args);
//     console.log('after function call');
//     // target.sendStateToNetwork();
//     return result;
//   };
// }



export class DealerService {
  // TODO: think how to avoid state duplication
  private state: IAppState = createDefaultAppState();

  constructor(private readonly node: WakuNodeService) {
    this.node.subscribe(message => {
      switch (message.type) {
        case '__player_online':
          this.onPlayerOnline(message);
          break;
        case '__player_vote':
          this.onPlayerVoted(message);
          break;
      }
    })
  }

  public startVoting(issue: IIssue): void {
    this.state.activeIssue = issue.id;
    this.sendStateToNetwork();
  }

  public reveal(): void {
    if (!this.state.activeIssue) {
      return;
    }

    this.state.revealResults = true;
    this.sendStateToNetwork();

  }

  public submitResult(result: Estimation): void {
    const activeIssue = this.state.issues.find(x => x.id === this.state.activeIssue);

    if (activeIssue) {
      activeIssue.result = result;
    }

    this.state.revealResults = false;
    this.state.activeIssue = null;
    this.sendStateToNetwork();

  }

  public revote(): void {
    const activeIssue = this.state.issues.find(x => x.id === this.state.activeIssue);

    if (activeIssue) {
      activeIssue.result = null;
      activeIssue.votes = {};
      this.sendStateToNetwork();
    }

    this.state.revealResults = false;
  }

  public addIssue(issue: IIssue): void {
    this.state.issues.push(issue);
    this.sendStateToNetwork();
  }

  public sendStateToNetwork(): void {
    this.node.send({
      type: '__state',
      state: this.state
    })
  }

  private onPlayerOnline(message: IPlayerOnlineMessage): void {
    const players = this.state.players;

    if (players.some((player) => player.id === message.player.id)) {
      return;
    }

    this.state.players.push(message.player);
    this.sendStateToNetwork();
  }

  private onPlayerVoted(message: IPlayerVoteMessage): void {
    const activeIssue = this.state.issues.find(x => x.id === this.state.activeIssue);

    if (!activeIssue || message.voteFor !== activeIssue.id) {
      return;
    }

    if (message.voteResult === null) {
      delete activeIssue.votes[message.voteBy];
    } else {
      activeIssue.votes[message.voteBy] = message.voteResult;
    }

    this.sendStateToNetwork();
  }

}
