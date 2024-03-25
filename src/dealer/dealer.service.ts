import { IIssue } from '../issue/issue.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { IPlayerOnlineMessage, IPlayerVoteMessage } from '../app/app-waku-message.model';
import { IAppState } from '../app/app.state';
import { Estimation } from '../voting/voting.model';
import { toArray, toDictionary } from '../shared/object';
import { RoomId } from '../room/room.model';
import { getRoomState, saveRoomState } from './dealer-resolver';


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
  private state: IAppState;
  constructor(private readonly node: WakuNodeService, private readonly roomId: RoomId) {
    this.state = getRoomState(roomId);

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

    this.sendStateToNetwork();
    this.enableIntervalSync();
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
      activeIssue.votes = [];
      this.sendStateToNetwork();
    }

    this.state.revealResults = false;
  }

  public addIssue(issue: IIssue): void {
    this.state.issues.push(issue);
    this.sendStateToNetwork();
  }

  public sendStateToNetwork(): void {
    let state = this.state;

    if (state.revealResults === false && state.activeIssue) {
      state = JSON.parse(JSON.stringify(this.state));
      state.issues = state.issues.map(issue => {
        if (issue.id === state.activeIssue) {
          issue.votes = issue.votes.map(vote => {
            return {
              ...vote,
              estimation: null
            }
          })
        }

        return issue;
      })
    }

    saveRoomState(this.roomId, this.state);

    this.node.send({
      type: '__state',
      state
    })
  }

  private enableIntervalSync(): void {
    setInterval(() => {
      this.sendStateToNetwork();
    }, 10000);
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

    const votes = toDictionary(activeIssue.votes, 'voteBy');

    if (message.vote.estimation === null) {
      delete votes[message.vote.voteBy];
    } else {
      votes[message.vote.voteBy] = message.vote;
    }

    activeIssue.votes = toArray(votes);
    this.sendStateToNetwork();
  }

}
