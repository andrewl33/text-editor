import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, Reducer } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { EditorAction } from "./Editor/EditorAction";
import { rootReducer } from "./reducers";
import { StoreState } from "./types";

import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory();

export const store = createStore<StoreState, EditorAction, any, any>(
  // rootReducer is casted from
  // EditorStoreState to StoreState
  // connectRouter creates a new StoreState, but without the
  // typings for rootReducer
  connectRouter(history)(rootReducer as Reducer<StoreState>),
  composeWithDevTools(
    applyMiddleware(
      thunk as ThunkMiddleware<StoreState, EditorAction>,
      routerMiddleware(history)
    )
  )
);
