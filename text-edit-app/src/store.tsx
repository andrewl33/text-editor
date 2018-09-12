import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { EditorAction } from './Editor/EditorAction';
import { StoreState } from './types';

// typing error with redux 4+
export const store = createStore<StoreState, EditorAction, any, any>(
  rootReducer,
  applyMiddleware(thunk)
);
