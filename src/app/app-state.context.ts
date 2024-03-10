import { createContext, useContext } from 'react';
import { IVotingState } from '../voting/voting.model';

export const GameStateContext = createContext<IVotingState>({
  issue: null,
  results: null
});

export const useGame = () => useContext(GameStateContext);