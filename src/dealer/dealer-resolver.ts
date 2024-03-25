import { IAppState } from '../app/app.state';
import { RoomId } from '../room/room.model';
import { getFromLocalStorage, saveToLocalStorage } from '../shared/local-storage';

// TODO: bad file naming

export function createDefaultAppState(): IAppState {
  return {
    players: [],
    issues: [],
    activeIssue: null,
    revealResults: false
  }
}

type IDealerRoomsList = Record<RoomId, IAppState>;

const STORAGE_KEY = 'DEALER';

export function isCurrentUserDealerForRoom(roomId: RoomId): boolean {
  const rooms = getDealerRooms();
  return rooms[roomId] !== undefined;
}

export function getRoomState(roomId: RoomId): IAppState {
  const rooms = getDealerRooms();
  return rooms[roomId] ?? createDefaultAppState();
}

export function createEmptyRoom(roomId: RoomId): void {
  saveRoomState(roomId, createDefaultAppState());
}

export function saveRoomState(roomId: RoomId, state: IAppState): void {
  const rooms = getDealerRooms();
  rooms[roomId] = state;
  saveToLocalStorage(STORAGE_KEY, rooms);
}

function getDealerRooms(): IDealerRoomsList {
  return getFromLocalStorage<IDealerRoomsList>(STORAGE_KEY) || {};
}
