import { Middleware } from 'redux';
import { AuthActionTypes, IStorage } from '../../types/auth';
import { RootState } from '../reducer';

export default (storage: IStorage): Middleware<{}, RootState> =>
  () =>
  (next) =>
  async (action) => {
    if (action.type === AuthActionTypes.REGISTER_SUCCESS) {
      storage.setAuth(action.data);
    } else if (action.type === AuthActionTypes.LOGOUT) {
      storage.clearAuth();
    }
    next(action);
  };
