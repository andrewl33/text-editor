import { EditorAction } from './EditorAction';
import { 
  UPDATE_CODE_REQUEST, UPDATE_CODE_SUCCESS, UPDATE_CODE_FAILURE, 
  CHANGED_CODE, GET_TEXT_REQUEST, GET_TEXT_SUCCESS, GET_TEXT_FAILURE, 
  NEW_TEXT_REQUEST, NEW_TEXT_SUCCESS, NEW_TEXT_FAILURE, 
  LOCK_TEXT, SHARE_LINK
} from '../constants';
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
  
    case UPDATE_CODE_REQUEST:
      return state;
    case UPDATE_CODE_SUCCESS:
      return state;
    case UPDATE_CODE_FAILURE:
      return state;
    
    case GET_TEXT_REQUEST:
      return state;
    case GET_TEXT_SUCCESS:
      return {...state, codeText: action.payload, isLoading: false};
    case GET_TEXT_FAILURE:
      return state;

    case NEW_TEXT_REQUEST:
      // create new url
      return { ...state};
    case NEW_TEXT_SUCCESS:
      return state;
    case NEW_TEXT_FAILURE:
      return state;

    case CHANGED_CODE:
    return state;
    case LOCK_TEXT:
      return state;
    case SHARE_LINK:
      return state;
    default:
      return state;
  }
  
}