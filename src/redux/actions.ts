import axios, { AxiosError } from 'axios';
import { replace, push, UpdateLocationActions } from '@lagunovsky/redux-react-router';
import { AuthAction, AuthActionTypes, IAuthData } from '../types/auth';
import { RootState } from './reducer';
import { UserAction, UserActionTypes } from '../types/user';
import { ThunkAction } from 'redux-thunk';
import { normalizeApiData } from './utils';

const API_KEY = 'ju16a6m81mhid5ue1z3v2g0uh';
const URL = 'https://api.supermetrics.com/assignment';
const PAGE_MAX = 10;

type AppActions = UserAction | AuthAction | UpdateLocationActions;
type AppThunkAction = ThunkAction<void, RootState, undefined, AppActions>;

export const logout = (): AppThunkAction => async (dispatch) => {
  dispatch({ type: AuthActionTypes.LOGOUT });
  dispatch(push('/login'));
};

export const loadData = (): AppThunkAction => async (dispatch, getState) => {
  const state = getState();
  const { loaded, loading } = state.users;
  if (loading || loaded) return;

  const { token } = state.auth;
  dispatch({ type: UserActionTypes.LOAD_DATA_REQUEST });
  try {
    const promises = [...Array(PAGE_MAX)].map((_, i) => {
      return axios
        .get(`${URL}/posts?sl_token=${token}&page=${i + 1}`)
        .then(({ data: { data } }) => {
          dispatch({ type: UserActionTypes.LOAD_DATA_CHUNK_SUCCESS, data: normalizeApiData(data.posts) });
        })
        .catch((e: AxiosError) => {
          if (e.response?.status === 401) {
            dispatch(logout());
            dispatch({ type: UserActionTypes.LOAD_DATA_ERROR, error: new Error(e.response.statusText) });
          } else throw e;
        });
    });
    await Promise.all(promises);
    dispatch({ type: UserActionTypes.LOAD_DATA_SUCCESS });
  } catch (e) {
    dispatch(replace('/error'));
    dispatch({ type: UserActionTypes.LOAD_DATA_ERROR, error: new Error() });
  }
};

export const register =
  ({ email, name }: IAuthData): AppThunkAction =>
  async (dispatch, getState) => {
    const state = getState();
    const { loading } = state.auth;
    if (loading) return;

    dispatch({ type: AuthActionTypes.REGISTER_REQUEST });
    const params = { client_id: API_KEY, email, name };
    try {
      const {
        data: { data },
      } = await axios.post(`${URL}/register`, params);
      dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, data: { token: data.sl_token, name } });
      dispatch(loadData());
      dispatch(push('/users'));
    } catch (error) {
      console.log(error);
      dispatch({ type: AuthActionTypes.REGISTER_ERROR, error: new Error() });
      dispatch(replace('/error'));
    }
  };
