import { combineReducers } from 'redux';
import { headerReducer } from './Header/HeaderReducer';
import { editorReducer } from './Editor/EditorReducer';

export const rootReducer = combineReducers({
  global: headerReducer,
  editor: editorReducer
});