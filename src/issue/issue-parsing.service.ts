import { IIssue, IRemoteIssue } from './issue.model';
import { isUrl } from '../shared/url';
import { generateHash } from '../shared/random-hash';
import { getIssueFromGithub } from './providers/github-issue-provider';

async function getRemoteIssue(issueUrl: string): Promise<IRemoteIssue | null> {
  if (!isUrl(issueUrl)) {
    return null;
  }

  return getIssueFromGithub(issueUrl);
}


export async function createIssueFromString(data: string): Promise<IIssue> {
  const issue: IIssue = {
    id: generateHash(),
    name: data
  };

  if (!isUrl(data)) {
    return issue;
  }

  issue.url = data;
  const issueDetails = await getRemoteIssue(issue.url);

  if (issueDetails) {
    issue.name = issueDetails.name
  }

  return issue;
}

export async function tryGetIssueDescription(issueUrl: string): Promise<string> {
  const issueDetails = await getRemoteIssue(issueUrl);
  return issueDetails?.description || '';

}
