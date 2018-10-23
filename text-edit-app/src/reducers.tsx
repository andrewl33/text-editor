import { combineReducers } from "redux";
import { authReducer } from "./Auth/AuthReducer";
import { collectionReducer } from "./Collection/CollectionReducer";
import { editorReducer } from "./Editor/EditorReducer";

export const rootReducer = combineReducers({
  authentication: authReducer,
  collection: collectionReducer,
  editor: editorReducer
});
