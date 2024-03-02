import { IGameState } from '../game/game-state.model';
import { CurrentUserService } from '../user/current-user.service';
import { WakuNodeService } from '../waku/waku-node.service';
import { PlayerEventsService } from './player-events.service';

export class PlayerService {
  private readonly events: PlayerEventsService;
  constructor(node: WakuNodeService, private readonly userService: CurrentUserService) {
    this.events = new PlayerEventsService(node);
  }

  public vote(voteFor: string, voteResult: number): void {
    this.events.sendVote({
      voteBy: this.userService.name,
      voteFor,
      voteResult
    })
  }

  public onStateChanged(callback: (state: IGameState) => void): this {
    this.events.onStateChanged(callback);
    return this;
  }

  public enableHeartBeat(): this {
    this.events.playerIsOnline(this.userService.name);

    setTimeout(() => {
      this.events.playerIsOnline(this.userService.name);
    }, 10 * 1000);

    return this;
  }


}