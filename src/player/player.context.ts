import { createContext, useContext } from 'react';
import { PlayerService } from './player.service';


export const PlayerContext = createContext<PlayerService | null>(null);
export const usePlayerContext = () => useContext(PlayerContext);