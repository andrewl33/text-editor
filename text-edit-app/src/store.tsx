import { applyMiddleware, createStore, Reducer } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { rootReducer } from './reducers';
import { EditorAction } from './Editor/EditorAction';
import { StoreState } from './types';

export const history = createBrowserHistory();

export const store = createStore<StoreState, EditorAction, any, any>(
  // rootReducer is casted from 
  // EditorStoreState to StoreState
  // connectRouter creates a new StoreState, but without the 
  // typings for rootreducer
  connectRouter(history)(rootReducer as Reducer<StoreState>),
  applyMiddleware(
    thunk as ThunkMiddleware<StoreState, EditorAction>,
    routerMiddleware(history)
  )
);
