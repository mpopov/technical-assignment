import { UserActionTypes, UserState, UserAction } from '../../types/user';

const initialState: UserState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state: UserState = initialState, action: UserAction): UserState => {
  const { type, data, error } = action;

  switch (type) {
    case UserActionTypes.LOAD_DATA_REQUEST:
      return { ...state, loading: true, error: null };
    case UserActionTypes.LOAD_DATA_CHUNK_SUCCESS:
      const receivedUsers = data?.users || {};
      const updatedUsers = Object.values(receivedUsers)
        .map((user) =>
          state.entities[user.id] ? { ...user, postIds: [...user.postIds, ...state.entities[user.id].postIds] } : user
        )
        .reduce((memo, user) => ({ ...memo, [user.id]: user }), {});
      return {
        ...state,
        entities: { ...state.entities, ...updatedUsers },
      };
    case UserActionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case UserActionTypes.LOAD_DATA_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: error || null,
      };
    default:
      return state;
  }
};
