import { createContext, useContext } from 'react';
import { DealerService } from './dealer.service';


export const DealerServiceContext = createContext<DealerService | null>(null);
export const useDealer = () => useContext(DealerServiceContext);