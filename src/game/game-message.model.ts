import { PlayerName } from '../player/player.model';
import { IVoteItem } from '../voting/voting.model';
import { IGameState } from './game-state.model';

export type IMessage = IDealerMessage | IPlayerMessage;

export type IDealerMessage = IStateMessage | IStartVotingMessage;

export interface IStartVotingMessage {
  type: '__start_voting';
  voteItem: IVoteItem;
}

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