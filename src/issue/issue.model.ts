export interface IRemoteIssue {
  name: string;
  description: string;
}

export interface IIssue {
  id: string;
  name: string;
  url?: string;
  result?: string;
}
