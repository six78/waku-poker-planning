
import { PlayerName } from '../player/player.model';

// TODO: avoid NO_VOTE_LABEL
export const NO_VOTE_LABEL = 'No vote';
// TODO: rename to Estimation?
export type Estimation = number;
export type HiddenEstimation = '';

export type VoteValueOrNoVote = Estimation | typeof NO_VOTE_LABEL;

export interface IVoteResult {
  [NO_VOTE_LABEL]?: PlayerName[];
  [key: Estimation]: PlayerName[];
}

