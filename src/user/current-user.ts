import { IPlayer, PlayerName } from '../player/player.model';
import { getFromLocalStorage, saveToLocalStorage } from '../shared/local-storage';
import { generateHash } from '../shared/random-hash';

const STORAGE_KEY = 'USER';

export function getUserDataFromLocalStorage(): IPlayer | null {
  return getFromLocalStorage<IPlayer>(STORAGE_KEY);
}

export function saveUserToLocalStorage(name: PlayerName): void {
  const user: IPlayer = {
    id: generateHash(),
    name,
  }

  saveToLocalStorage(STORAGE_KEY, user)
}

