import { PlayerName } from '../player/player.model';

export interface IGameState {
  players: PlayerName[];
  voteFor: string | null;
}


// interface IVoteItem {
//   id: string; // import or randomly generated
//   title: string;
//   description: string;
//   url: string;
//   votes: { [key: ParticipantName]: number };
//   voteResult?: number;
// }

// interface IParticipant {
//   name: ParticipantName;
//   dealer?: boolean;
// }

// export interface IState2 {
//   participants: IParticipant[];
//   activeVoteItemId: string | null;
//   voteItems: IVoteItem[];
// }

// // Initial State
// const initialState: IState2 = {
//   participants: [{ name: 'Я дилер', dealer: true }],
//   activeVoteItemId: null,
//   voteItems: []
// }

// const anotherParticipantsJoined: IState2 = {
//   participants: [
//     { name: 'Я дилер', dealer: true },
//     { name: 'John' },
//     { name: 'Stacy' },
//   ],
//   activeVoteItemId: null,
//   voteItems: []
// }

// const voteItemsLoaded: IState2 = {
//   participants: [
//     { name: 'Я дилер', dealer: true },
//     { name: 'John' },
//     { name: 'Stacy' },
//   ],
//   activeVoteItemId: null,
//   voteItems: [
//     {
//       id: 'kdfiu4',
//       title: 'Task 1',
//       description: 'Добавить кнопку в UI',
//       url: 'https://jira.com/issue/kdfiu4',
//       votes: []
//     },
//     {
//       id: 'fj4kd',
//       title: 'User Story 2',
//       description: 'Добавить баннер',
//       url: 'https://jira.com/issue/fj4kd',
//       votes: []
//     }
//   ]
// }


// const voteStarted: IState2 = {
//   participants: [
//     { name: 'Я дилер', dealer: true },
//     { name: 'John' },
//     { name: 'Stacy' },
//   ],
//   activeVoteItemId: 'kdfiu4',
//   voteItems: [
//     {
//       id: 'kdfiu4',
//       title: 'Task 1',
//       description: 'Добавить кнопку в UI',
//       url: 'https://jira.com/issue/kdfiu4',
//       votes: []
//     },
//     {
//       id: 'fj4kd',
//       title: 'User Story 2',
//       description: 'Добавить баннер',
//       url: 'https://jira.com/issue/fj4kd',
//       votes: []
//     }
//   ]
// }

// interface IVoteMessage {
//   itemId: string;
//   player: ParticipantName;
//   vote: number;
// }

// const someParticipantVoted: IState2 = {
//   participants: [
//     { name: 'Я дилер', dealer: true },
//     { name: 'John' },
//     { name: 'Stacy' },
//   ],
//   activeVoteItemId: 'kdfiu4',
//   voteItems: [
//     {
//       id: 'kdfiu4',
//       title: 'Task 1',
//       description: 'Добавить кнопку в UI',
//       url: 'https://jira.com/issue/kdfiu4',
//       votes: [
//         { participant: 'John', vote: 13 }
//       ]
//     },
//     {
//       id: 'fj4kd',
//       title: 'User Story 2',
//       description: 'Добавить баннер',
//       url: 'https://jira.com/issue/fj4kd',
//       votes: []
//     }
//   ]
// }
