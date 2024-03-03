import { IGithubIssue } from './providers/github.model';
import { generateGuid } from '../shared/guid';
import { IVoteItem } from '../voting/voting.model';

const settings = {
  github: {
    url: 'https://github.com',
    apiUrl: 'https://api.github.com/repos'
  }
}

export class IssueParsingService {
  public async createIssueFromString(data: string): Promise<IVoteItem> {
    if (!this.isUrl) {
      return this.createEmptyIssue(data);
    }

    const gitHubResult = await this.tryParsePublicGithubIssue(data);
    return gitHubResult || this.createEmptyIssue(data);
  }

  private isUrl(data: string): boolean {
    let url;

    try {
      url = new URL(data);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  private async tryParsePublicGithubIssue(url: string): Promise<IVoteItem | null> {
    const isGithub = url.indexOf(settings.github.url) === 0;

    if (!isGithub) {
      return null;
    }

    const apiUrl = url.replace(
      settings.github.url,
      settings.github.apiUrl
    );

    try {
      const response = await fetch(apiUrl);
      const result = await response.json() as IGithubIssue;

      return {
        id: generateGuid(),
        name: result.title,
        url: result.html_url,
        description: result.body
      }
    } catch {
      return null;
    }
  }

  private createEmptyIssue(name: string): IVoteItem {
    return {
      id: generateGuid(),
      name
    }
  }
}