import { combineReducers } from 'redux';
import { authReducer } from './Auth/AuthReducer';
import { editorReducer } from './Editor/EditorReducer';
import { collectionReducer } from './Collection/CollectionReducer';

export const rootReducer = combineReducers({
  authentication: authReducer,
  collection: collectionReducer,
  editor: editorReducer
});