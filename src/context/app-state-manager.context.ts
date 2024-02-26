import { createContext } from 'react';

interface IManageParticipants {
  addParticipant(name: string, participants: string[]): void;
  removeParticipant(name: string, participants: string[]): void;
}

interface IManageVoting {

}

// TODO: throw away??? 
export class AppStateManager implements IManageParticipants, IManageVoting {
  constructor(
    private readonly setParticipants: (participants: string[]) => void
  ) {

  }

  public addParticipant(name: string, participants: string[]): void {
    const result = participants.some(x => x === name)
      ? participants
      : [...participants, name]

    this.setParticipants(result);
  }

  public removeParticipant(name: string, participants: string[]): void {
    this.setParticipants(participants.filter(x => x === name));
  }
}

// TODO: can avoid 'as unknown as AppStateManager'?
export const AppStateManagerContext = createContext<AppStateManager>(null as unknown as AppStateManager);