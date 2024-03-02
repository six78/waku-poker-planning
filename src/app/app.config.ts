import { generateGuid } from '../shared/guid'
import { IVoteItem } from '../voting/voting.model'

const mockedVoteCongif: IVoteItem | null = {
  id: generateGuid(),
  name: 'mocked issue'
}

export const appConfig = {
  fakeNode: false,
  mockedVoteCongif: null
}