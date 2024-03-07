import { createContext, useContext } from 'react';
import { IGameState } from '../game/game-state.model';

export const GameStateContext = createContext<IGameState>({
  players: [],
  voteItem: null,
  tempVoteResults: null
});

export const useGame = () => useContext(GameStateContext);