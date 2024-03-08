import { IGameState } from '../game/game-state.model';
import { WakuNodeService } from '../waku/waku-node.service';
import { PlayerEventsService } from './player-events.service';
import { IPlayer, PlayerId, PlayerName } from './player.model';

export class PlayerService {
  public readonly playerId: PlayerId;
  public readonly playerName: PlayerName;
  /**
   * @deprecated
   * TODO: remove isDealer and call useDealer() instead
   */
  public readonly isDealer: boolean;
  private readonly events: PlayerEventsService;

  constructor(node: WakuNodeService, player: IPlayer) {
    this.playerId = player.id;
    this.playerName = player.name;
    this.isDealer = player.isDealer;
    this.events = new PlayerEventsService(node);
  }

  public vote(voteFor: string, voteResult: number | null): void {
    this.events.sendVote({
      voteBy: this.playerId,
      voteFor,
      voteResult
    })
  }

  public onStateChanged(callback: (state: IGameState) => void): this {
    this.events.onStateChanged(callback);
    return this;
  }

  public enableHeartBeat(): this {
    const player: IPlayer = {
      id: this.playerId,
      name: this.playerName,
      isDealer: this.isDealer
    }

    this.events.playerIsOnline(player);

    setTimeout(() => {
      this.events.playerIsOnline(player);
    }, 10 * 1000);

    return this;
  }


}