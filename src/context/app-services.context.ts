import { createContext } from 'react';
import { CurrentUserService } from '../user/current-user.service';
import { WakuNodeService } from '../waku/waku-node.service';
import { RelayNode } from '@waku/sdk';
import { PlayerEventsService } from '../player/player-events.service';


// TODO: throw away??
export class AppServices {
  public readonly currentUser = new CurrentUserService();
  public readonly wakuNode: WakuNodeService;
  public readonly participantMessageService: PlayerEventsService;

  constructor(
    node: RelayNode
  ) {
    this.wakuNode = new WakuNodeService(node);
    this.participantMessageService = new PlayerEventsService(this.wakuNode, this.currentUser);
  }
}

// TODO: can avoid 'as unknown as AppServices'?
export const AppServicesContext = createContext<AppServices>(null as unknown as AppServices);