import { AuthActionTypes, AuthState, AuthAction } from '../../types/auth';

const initialState: AuthState = {
  token: '',
  name: '',
  loading: false,
  error: null,
};

export default (state: AuthState = initialState, action: AuthAction): AuthState => {
  const { type, data, error } = action;

  switch (type) {
    case AuthActionTypes.REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        token: data?.token,
        name: data?.name,
        loading: false,
      };
    case AuthActionTypes.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: error || null,
      };
    case AuthActionTypes.LOGOUT:
      return { ...state, token: '', name: '' };
    default:
      return state;
  }
};
