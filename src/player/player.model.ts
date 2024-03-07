export type PlayerName = string;
export type PlayerId = string;

export interface IPlayer {
  id: PlayerId;
  name: PlayerName;
  isDealer: boolean;
}