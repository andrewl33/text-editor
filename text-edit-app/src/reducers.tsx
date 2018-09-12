import { combineReducers } from 'redux';
import { editorReducer } from './Editor/EditorReducer';

export const rootReducer = combineReducers({
  editor: editorReducer
});