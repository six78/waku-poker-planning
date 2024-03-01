import { createContext, useContext } from 'react';
import { DealerService } from './dealer.service';


export const DealerContext = createContext<DealerService | null>(null);
export const useDealerContext = () => useContext(DealerContext);