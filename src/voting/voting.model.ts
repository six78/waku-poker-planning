import { PlayerId } from '../player/player.model';

export type Estimation = string;

export interface IVote {
  voteBy: PlayerId;
  timestamp: number;
  estimation: Estimation | null;
}