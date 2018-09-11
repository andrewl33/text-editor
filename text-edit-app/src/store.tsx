import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { HeaderAction } from './Header/HeaderAction';
import { StoreState } from './types';

// typing error with redux 4+
export const store = createStore<StoreState, HeaderAction, any, any>(
  rootReducer,
  applyMiddleware(thunk)
);
