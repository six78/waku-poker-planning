import { createContext, useContext } from 'react';
import { IGameState } from '../game/game-state.model';

export const AppStateContext = createContext<IGameState>({
  players: [],
  voteItem: null,
  tempVoteResults: null
});

export const useAppState = () => useContext(AppStateContext);