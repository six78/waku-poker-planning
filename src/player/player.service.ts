import { IGameState } from '../game/game-state.model';
import { CurrentUserService } from '../user/current-user.service';
import { WakuNodeService } from '../waku/waku-node.service';
import { PlayerEventsService } from './player-events.service';

export class PlayerService {
  public readonly playerId: string;
  public readonly isDealer: boolean;
  private readonly events: PlayerEventsService;
  constructor(node: WakuNodeService, private readonly userService: CurrentUserService) {
    this.events = new PlayerEventsService(node);
    this.playerId = this.userService.id;
    this.isDealer = userService.isDealer;
  }

  public vote(voteFor: string, voteResult: number | null): void {
    this.events.sendVote({
      voteBy: this.userService.id,
      voteFor,
      voteResult
    })
  }

  public onStateChanged(callback: (state: IGameState) => void): this {
    this.events.onStateChanged(callback);
    return this;
  }

  public enableHeartBeat(): this {
    const player = {
      id: this.userService.id,
      name: this.userService.name
    }

    this.events.playerIsOnline(player);

    setTimeout(() => {
      this.events.playerIsOnline(player);
    }, 10 * 1000);

    return this;
  }


}