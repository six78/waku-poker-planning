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

export type IPlayerMessage = IParticipantOnlineMessage | IParticipantVoteMessage;

export interface IParticipantOnlineMessage {
  type: '__player_online';
  name: string;
}

export interface IParticipantVoteMessage {
  type: '__player_vote';
  name: string;
  voteFor: string;
  voteResult: number | null;
}