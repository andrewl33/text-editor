import { CollectionAction } from './CollectionAction';
import {
  NEW_COLLECTION_REQUEST, NEW_COLLECTION_SUCCESS, NEW_COLLECTION_FAILURE,
  GET_COLLECTION_REQUEST, GET_COLLECTION_SUCCESS, GET_COLLECTION_FAILURE,
  AUTH_COLLECTION_REQUEST, AUTH_COLLECTION_SUCCESS, AUTH_COLLECTION_FAILURE,
  LOCK_COLLECTION_REQUEST, LOCK_COLLECTION_SUCCESS, LOCK_COLLECTION_FAILURE,
  ADD_FILE_REQUEST, ADD_FILE_SUCCESS, ADD_FILE_FAILURE,
  REMOVE_FILE_REQUEST, REMOVE_FILE_SUCCESS, REMOVE_FILE_FAILURE,
} from './constants';
import {
  SHARE_LINK, CLOSE_ALERT
} from '../constants';
import { CollectionStoreState } from '../types';

export const initialState: CollectionStoreState = {
  items: null,
  openAlert: false,
  alertMessage: '',
  isLocked: false
}

export const collectionReducer = (state: CollectionStoreState = initialState, action: CollectionAction) => {

  switch(action.type) {

    case NEW_COLLECTION_REQUEST:
      return {...state};
    case NEW_COLLECTION_SUCCESS:
      return {...state};
    case NEW_COLLECTION_FAILURE:
      return {...state};  

    case GET_COLLECTION_REQUEST:
      return {...state};
    case GET_COLLECTION_SUCCESS:
      return {...state, items: action.payload && action.payload.items};  
    case GET_COLLECTION_FAILURE:
      return {...state};  

    case AUTH_COLLECTION_REQUEST:
      return {...state};  
    case AUTH_COLLECTION_SUCCESS:
      return {...state};  
    case AUTH_COLLECTION_FAILURE:
      return {...state};  

    case LOCK_COLLECTION_REQUEST:
      return {...state};  
    case LOCK_COLLECTION_SUCCESS:
      return {...state, isLocked: action.payload};      
    case LOCK_COLLECTION_FAILURE:
      return {...state};  

    case ADD_FILE_REQUEST:
    case ADD_FILE_SUCCESS:
    case ADD_FILE_FAILURE:

    case REMOVE_FILE_REQUEST:
    case REMOVE_FILE_SUCCESS:
    case REMOVE_FILE_FAILURE:

    case SHARE_LINK:
      return {...state, openAlert: true, alertMessage: 'Copied to clipboard'};
    case CLOSE_ALERT:
      return {...state, openAlert: false};
    
    default:
      return state;

  }

}