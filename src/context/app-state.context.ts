import { createContext } from 'react';
import { IState } from '../models/state.model';

export const AppStateContext = createContext<IState>({
  participants: [],
  voteFor: null,
});