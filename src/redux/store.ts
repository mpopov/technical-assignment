import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRouterMiddleware } from '@lagunovsky/redux-react-router';

import addPersistentStorage from './middleware/persistent-storage';
import { rootReducer } from './reducer';
import history from '../history';
import storage from './misc/local-storage';
import hydrateState from './misc/hydrate-state';

const enhancer = applyMiddleware(thunk, createRouterMiddleware(history), addPersistentStorage(storage));
export default createStore(rootReducer, hydrateState(storage), composeWithDevTools(enhancer));
