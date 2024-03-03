import { PlayerName } from '../player/player.model';
import { IGameState } from './game-state.model';

export type IMessage = IPlayerMessage | IStateMessage;

export interface IStateMessage {
  type: '__state';
  state: IGameState;
}

export type IPlayerMessage = IParticipantOnlineMessage | IPlayerVoteMessage;

export interface IParticipantOnlineMessage {
  type: '__player_online';
  name: string;
}

export interface IPlayerVoteMessage {
  type: '__player_vote';
  voteFor: string;
  voteResult: number | null;
  voteBy: PlayerName
}