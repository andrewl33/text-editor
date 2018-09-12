import { EditorAction } from './EditorAction';
import { UPDATE_CODE, CHANGED_CODE } from '../constants';
import { EditorStoreState } from '../types';

const initialState: EditorStoreState = {
  codeText: "var wow"
}

export const editorReducer = (state: EditorStoreState = initialState, action: EditorAction) => {
  switch(action.type) {
    case UPDATE_CODE:
      return state;
    case CHANGED_CODE:
      return state;
    default:
      return state;
  }
}