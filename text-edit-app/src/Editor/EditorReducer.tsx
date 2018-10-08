import { EditorAction } from './EditorAction';
import { 
  UPDATE_CODE_REQUEST, UPDATE_CODE_SUCCESS, UPDATE_CODE_FAILURE, 
  CHANGED_CODE, GET_TEXT_REQUEST, GET_TEXT_SUCCESS, GET_TEXT_FAILURE, 
  NEW_TEXT_REQUEST, NEW_TEXT_SUCCESS, NEW_TEXT_FAILURE, 
  LOCK_TEXT, SHARE_LINK, CLOSE_ALERT
} from '../constants';
import { EditorStoreState } from '../types';

export const initialState: EditorStoreState = {
  codeText: "var wow", 
  isLoading: true,
  isNewPage: false,
  hasAuth: false,
  isLocked: false,
  isSaved: true,
  openAlert: false,
  alertMessage: ''
}

export const editorReducer = (state: EditorStoreState = initialState, action: EditorAction) => {

  switch(action.type) {
  
    case UPDATE_CODE_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_CODE_SUCCESS:
      return {...state, isLoading: false, isSaved: true, openAlert: true, alertMessage: 'Updated code'};
    case UPDATE_CODE_FAILURE:
      return {...state, isLoading: false, isSaved: false, openAlert: true, alertMessage: 'Failed to update code'};
    
    case GET_TEXT_REQUEST:
      return {...state, isLoading: true, openAlert: true, alertMessage: 'Loading code...'};
    case GET_TEXT_SUCCESS:
      return {...state, codeText: action.payload, isLoading: false, isSaved: true};
    case GET_TEXT_FAILURE:
      return {...state, isLoading: false, isSaved: false, openAlert: true, alertMessage: 'Failed to load saved code'};

    case NEW_TEXT_REQUEST:
      return {...state, isLoading:true, isNewPage: true};
    case NEW_TEXT_SUCCESS:
      return {...initialState, isNewPage: true, isLoading: false, openAlert: true, alertMessage: 'Created a new page'};
    case NEW_TEXT_FAILURE:
      return {...state, isNewPage: false, isLoading: false, openAlert: true, alertMessage: 'Failed to create new page, try again'};

    case CHANGED_CODE:
    return state;
    case LOCK_TEXT:
      return state;
    case SHARE_LINK:
      return {...state, openAlert: true, alertMessage: 'Copied to clipboard'};
    case CLOSE_ALERT:
      return {...state, openAlert: false};
    default:
      return state;
  }
  
}