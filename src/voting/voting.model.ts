import { PlayerId, PlayerName } from '../player/player.model';

export const NO_VOTE_LABEL = 'No vote';
export type VoteValue = number;
export type VoteValueOrNoVote = VoteValue | typeof NO_VOTE_LABEL;

export interface IVoteResult {
  [NO_VOTE_LABEL]?: PlayerName[];
  [key: VoteValue]: PlayerName[];
}

export interface IVoteItem {
  id: string;
  name: string;
  url?: string;
  description?: string
  result?: number;
  voteHistory?: { [key: PlayerId]: number };
}