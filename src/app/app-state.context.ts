import { createContext } from 'react';
import { IGameState } from '../game/game-state.model';

export const AppStateContext = createContext<IGameState>({
  players: [],
  voteFor: null,
});