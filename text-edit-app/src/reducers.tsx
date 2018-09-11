import { combineReducers } from 'redux';
import { header as HeaderReducer } from './Header/HeaderReducer';
import { EditorReducer } from './Editor/EditorReducer';

export const rootReducer = combineReducers({
  global: HeaderReducer,
  editor: EditorReducer
});