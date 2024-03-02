import { WakuNodeService } from '../waku/waku-node.service';
import { CurrentUserService } from './../user/current-user.service';
import { createContext } from 'react';


export interface IAppContext {
  userService: CurrentUserService,
  wakuNodeService: WakuNodeService,
}

export const AppContext = createContext<IAppContext | null>(null);