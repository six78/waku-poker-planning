import { IPlayer, PlayerName } from '../player/player.model';
import { generateGuid } from '../shared/guid';
import { getFromLocalStorage, saveToLocalStorage } from '../shared/local-storage';

const STORAGE_KEY = 'USER';

export function getUserDataFromLocalStorage(): IPlayer | null {
  return getFromLocalStorage<IPlayer>(STORAGE_KEY);
}

export function saveUserToLocalStorage(name: PlayerName): void {
  const user: IPlayer = {
    id: generateGuid(),
    name,
    // TODO: do not store isDealer 
    isDealer: false
  }

  saveToLocalStorage(STORAGE_KEY, user)
}

