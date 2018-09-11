import { HeaderAction } from './HeaderAction';
import { NEW_TEXT, LOCK_TEXT, SHARE_LINK } from '../constants';
import { GlobalStoreState } from '../types';

const initialState: GlobalStoreState = {
  isLoading: true,
  isNewPage: false,
  url: '',
  hasAuth: false,
  isLocked: false,
  isSaved: false
}

export const header = (state: GlobalStoreState = initialState, action: HeaderAction) => {
  switch(action.type) {
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