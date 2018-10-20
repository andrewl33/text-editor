import { EditorAction } from './EditorAction';
import { 
  UPDATE_CODE_REQUEST, UPDATE_CODE_SUCCESS, UPDATE_CODE_FAILURE, 
  CHANGED_CODE, GET_TEXT_REQUEST, GET_TEXT_SUCCESS, GET_TEXT_FAILURE, 
  NEW_TEXT_REQUEST, NEW_TEXT_SUCCESS, NEW_TEXT_FAILURE, GET_TEXT_AUTH, 
  AUTH_FILE_REQUEST, AUTH_FILE_SUCCESS, AUTH_FILE_FAILURE 
} from './constants';
import { LOCK_TEXT, SHARE_LINK, CLOSE_ALERT } from '../constants';
import { EditorStoreState } from '../types';

export const initialState: EditorStoreState = {
  codeText: `// we could write the above example as:
  var anon = (a, b) => a + b;
  // or
  var anon = (a, b) => { return a + b };
  // if we only have one parameter we can loose the parentheses
  var anon = a => a;
  // and without parameters
  var () => {} // noop
  
  // this looks pretty nice when you change something like:
  [1,2,3,4].filter(function (value) {return value % 2 === 0});
  // to:
  [1,2,3,4].filter(value => value % 2 === 0);`,
  tags: ["tag1", "tag2", "JavaScript"], 
  isLoading: true,
  isNewPage: false,
  hasAuth: false,
  isLocked: false,
  isSaved: true,
  openAlert: false,
  alertMessage: '',
  filePrompt: false,
  createDate: '1-1-1990',
  users: ["jimmy", 'joy'],
  name: "Example Lambdas"
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
      return {...state, codeText: action.payload && action.payload.body && action.payload.body.codeText, tags: action.payload && action.payload.body && action.payload.body.tags, isLoading: false, isSaved: true};
    case GET_TEXT_FAILURE:
      return {...state, isLoading: false, isSaved: false, openAlert: true, alertMessage: 'Failed to load saved code'};
    case GET_TEXT_AUTH:
      return {...state, filePrompt: true, prompt: "Private File"};


    case NEW_TEXT_REQUEST:
      return {...state, isLoading:true, isNewPage: true};
    case NEW_TEXT_SUCCESS:
      return {...initialState, isNewPage: true, isLoading: false, openAlert: true, alertMessage: 'Created a new page'};
    case NEW_TEXT_FAILURE:
      return {...state, isNewPage: false, isLoading: false, openAlert: true, alertMessage: 'Failed to create new page, try again'};

    case AUTH_FILE_REQUEST:
      return {...state, openAlert: true, alertMessage: "Authenticating"};
    case AUTH_FILE_SUCCESS:
      return {...state, filePrompt: false};
    case AUTH_FILE_FAILURE:
      return {...state, openAlert: true, alertMessage: "Authentication Failed"};

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