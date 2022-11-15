import { PostActionTypes, PostsState, PostAction } from '../../types/post';


const initialState: PostsState = {
  entities: {},
};

export default (state: PostsState = initialState, action: PostAction) => {
  const { type, data } = action;

  switch (type) {
    case PostActionTypes.LOAD_DATA_CHUNK_SUCCESS:
      return {
        ...state,
        entities: {...state.entities, ...data?.posts},
      };
    default:
      return state;
  }
};
