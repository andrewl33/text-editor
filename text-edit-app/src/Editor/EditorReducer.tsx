import { EditorAction } from './EditorAction';
import { UPDATE_CODE, CHANGED_CODE, NEW_TEXT, LOCK_TEXT, SHARE_LINK } from '../constants';
import { EditorStoreState } from '../types';

const initialState: EditorStoreState = {
  codeText: "var wow", 
  isLoading: true,
  isNewPage: false,
  url: '',
  hasAuth: false,
  isLocked: false,
  isSaved: false
}

export const editorReducer = (state: EditorStoreState = initialState, action: EditorAction) => {
  switch(action.type) {
    case UPDATE_CODE:
      return state;
    case CHANGED_CODE:
      return state;
    case NEW_TEXT:
      // create new url
      return { ...state, };
    case LOCK_TEXT:
      return state;
    case SHARE_LINK:
      return state;
    default:
      return state;
  }
}