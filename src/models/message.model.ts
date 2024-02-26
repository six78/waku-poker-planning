import { IState } from './state.model';

export type IMessage = IHostMessage | IParticipantMessage;

export type IHostMessage = IStateMessage | IStartVotingMessage;

export interface IStartVotingMessage {
  type: '__start_voting';
  voteFor: string;
}

export interface IStateMessage {
  type: '__state';
  state: IState;
}

export type IParticipantMessage = IParticipantOnlineMessage | IParticipantVoteMessage;

export interface IParticipantOnlineMessage {
  type: '__participant_online';
  name: string;
}

export interface IParticipantVoteMessage {
  type: '__participant_vote';
  name: string;
  voteFor: string;
  voteResult: number | null;
}