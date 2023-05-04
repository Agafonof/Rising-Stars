type GUEST = 'guest';
type FETCHING = 'fetching';
type LOGGED = 'logged';

export type StatusType = GUEST | FETCHING | LOGGED

export type fetchingType = {
  status: StatusType,
}
