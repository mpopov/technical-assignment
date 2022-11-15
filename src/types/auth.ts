export interface AuthState {
  token: string | undefined;
  name: string | undefined;
  loading: boolean;
  error: Error | null;
}

export enum AuthActionTypes {
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_ERROR = 'REGISTER_ERROR',
  LOGOUT = 'LOGOUT',
}

export interface AuthAction {
  type: AuthActionTypes.REGISTER_REQUEST
  | AuthActionTypes.REGISTER_SUCCESS
  | AuthActionTypes.REGISTER_ERROR
  | AuthActionTypes.LOGOUT;
  data?: IAuthData2Store;
  error?: Error;
}

export interface IAuthData {
  name: string;
  email: string;
}

export interface IAuthData2Store {
  name: string;
  token: string;
}

export interface IStorage {
  getAuth: () => IAuthData2Store;
  setAuth: (auth: IAuthData2Store) => void;
  clearAuth: () => void;
}