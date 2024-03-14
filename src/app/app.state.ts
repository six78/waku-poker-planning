import { atom, useRecoilState } from 'recoil';
import { IPlayer } from '../player/player.model';
import { IVotingState } from '../voting/voting.model';
import { IIssue } from '../issue/issue.model';

export const DEFAULT_VOTING_STATE: IVotingState = {
  issue: null,
  results: null,
  reveal: false
}

const playersOnline = atom<IPlayer[]>({
  key: 'onlinePlayersList',
  default: []
});

export const useOnlinePlayersList = () => useRecoilState(playersOnline);

const voting = atom<IVotingState>({
  key: 'voting',
  default: DEFAULT_VOTING_STATE
})

export const useVoting = () => useRecoilState(voting);

const issuesList = atom<IIssue[]>({
  key: 'issuesList',
  default: []
})

export const useIssues = () => useRecoilState(issuesList);
