import { atom, useRecoilState } from 'recoil';
import { IPlayer } from '../player/player.model';
import { IVotingState } from '../voting/voting.model';
import { IIssue } from '../issue/issue.model';

const playersOnline = atom<IPlayer[]>({
  key: 'onlinePlayersList',
  default: []
});

export const useOnlinePlayersList = () => useRecoilState(playersOnline);

const voting = atom<IVotingState>({
  key: 'voting',
  default: {
    issue: null,
    results: {}
  }
})

export const useVoting = () => useRecoilState(voting);

const issuesList = atom<IIssue[]>({
  key: 'issuesList',
  default: []
})

export const useIssues = () => useRecoilState(issuesList);
