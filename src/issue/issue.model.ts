import { PlayerId } from '../player/player.model';

export interface IIssue {
  id: string;
  name: string;
  url?: string;
  description?: string
  result?: number;
  voteHistory?: { [key: PlayerId]: number };
}