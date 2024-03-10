import { atom, useRecoilState } from 'recoil';
import { IPlayer } from '../player/player.model';

const playersOnline = atom<IPlayer[]>({
  key: 'onlinePlayersList',
  default: []
});

export const useOnlinePlayersList = () => useRecoilState(playersOnline);
