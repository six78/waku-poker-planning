import { createContext } from 'react';
import { CurrentUserService } from '../services/current-user.service';
import { WakuNodeService } from '../services/waku-node.service';
import { RelayNode } from '@waku/sdk';
import { ParticipantMessageService } from '../services/participant-message.service';


// TODO: throw away??
export class AppServices {
  public readonly currentUser = new CurrentUserService();
  public readonly wakuNode: WakuNodeService;
  public readonly participantMessageService: ParticipantMessageService;

  constructor(
    node: RelayNode
  ) {
    this.wakuNode = new WakuNodeService(node);
    this.participantMessageService = new ParticipantMessageService(this.wakuNode, this.currentUser);
  }
}

// TODO: can avoid 'as unknown as AppServices'?
export const AppServicesContext = createContext<AppServices>(null as unknown as AppServices);