export interface UserState {
  entities: { [key: string]: IUser };
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export enum UserActionTypes {
  LOAD_DATA_REQUEST = 'LOAD_DATA_REQUEST',
  LOAD_DATA_CHUNK_SUCCESS = 'LOAD_DAT_CHUNK_SUCCESS',
  LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS',
  LOAD_DATA_ERROR = 'LOAD_DATA_ERROR'
}

export interface UserAction {
  type: UserActionTypes.LOAD_DATA_REQUEST
  | UserActionTypes.LOAD_DATA_CHUNK_SUCCESS
  | UserActionTypes.LOAD_DATA_SUCCESS
  | UserActionTypes.LOAD_DATA_ERROR;
  data?: {
    users: { [key: string]: IUser },
  };
  error?: Error;
}

export interface IUser {
  id: string;
  name: string;
  postIds: string[],
}
