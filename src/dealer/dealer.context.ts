import { createContext, useContext } from 'react';
import { DealerService } from './dealer.service';


export const DealerServiceContext = createContext<DealerService | null>(null);
export function useDealer() {
  const dealerService = useContext(DealerServiceContext);
  if (!dealerService) {
    throw new Error('Trying to use dealer service, but no provider was found')
  }

  return dealerService
}