import { RoomId } from './../room/room.model';
import { useNavigate } from 'react-router-dom';

export const REDIRECT_TO_ROOM_URL_PARAM = 'redirectToRoom';

export function useNavigateToRoom() {
  const navigate = useNavigate();

  return (roomId: RoomId) => navigate(`/room/${roomId}`);
}