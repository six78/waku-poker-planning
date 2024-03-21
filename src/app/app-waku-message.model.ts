import { IssueId } from '../issue/issue.model';
import { IPlayer, PlayerId } from '../player/player.model';
import { Estimation } from '../voting/voting.model';
import { IAppState } from './app.state';

export type IMessage = IPlayerMessage | IStateMessage

export interface IStateMessage {
  type: '__state';
  state: IAppState;
}

export type IPlayerMessage = IPlayerOnlineMessage | IPlayerVoteMessage;

export interface IPlayerOnlineMessage {
  type: '__player_online';
  player: IPlayer
}

export interface IPlayerVoteMessage {
  type: '__player_vote';
  voteFor: IssueId;
  voteResult: Estimation | null;
  voteBy: PlayerId;
}
