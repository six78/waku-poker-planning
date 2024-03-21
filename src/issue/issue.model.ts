import { PlayerId } from '../player/player.model';
import { Estimation } from '../voting/voting.model';

export type IssueId = string;

/**
 * @description
 * Each issues provider (e.g. github, jira and etc.) should return this model
 * TODO: rename to ITaskTrackerIssue
 */
export interface IRemoteIssue {
  name: string;
  description: string;
}

export interface IIssue {
  id: IssueId;
  titleOrUrl: string;
  votes: { [key: PlayerId]: Estimation }
  result: Estimation | null
}
