import { combineReducers } from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router';

import auth from './auth';
import posts from './posts';
import users from './users';
import history from '../../history';

export const rootReducer = combineReducers({
  router: createRouterReducer(history),
  auth,
  posts,
  users,
});

export type RootState = ReturnType<typeof rootReducer>;
