import { getFromLocalStorage, saveToLocalStorage } from '../shared/local-storage';

const STORAGE_KEY = 'DEALER';

export function isCurrentUserDealerForRoom(roomId: string): boolean {
  const rooms = getDealerRooms();
  return rooms.some(room => room === roomId);
}

export function saveDealerRoom(roomId: string): void {
  const rooms = getDealerRooms();
  saveToLocalStorage(STORAGE_KEY, [...rooms, roomId]);
}

function getDealerRooms(): string[] {
  return getFromLocalStorage<string[]>(STORAGE_KEY) || [];
}
