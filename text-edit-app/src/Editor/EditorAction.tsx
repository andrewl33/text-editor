import { UPDATE_CODE, CHANGED_CODE, NEW_TEXT, LOCK_TEXT, SHARE_LINK} from '../constants';

import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../types';

export interface UpdateCode{
  type: UPDATE_CODE;
  payload: string;
}

export interface ChangedCode {
  type: CHANGED_CODE;
}

export interface NewText {
  type: NEW_TEXT;
}

export interface LockText {
  type: LOCK_TEXT;
}

export interface ShareLink {
  type: SHARE_LINK;
}

export type EditorAction =  UpdateCode | ChangedCode | NewText | LockText | ShareLink;

export const updateCode = (codeText: string) => {
  return async (dispatch: ThunkDispatch<StoreState, void, EditorAction>) => {
    const data = {url: 'test', codeText };
    try {
      await fetch('/save', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      dispatch({
        type: UPDATE_CODE,
        payload: codeText
      })
    } catch(e) {
      //
    }
  }
}


export const changedCode = (): ChangedCode => {
  return {
    type: CHANGED_CODE
  }
}

export const lockText = (): LockText => {
  // nothing yet
  return {
    type: LOCK_TEXT
  }
}

export const newText = (): NewText => {
  return {
    type: NEW_TEXT
  }
}

export const shareLink = (): ShareLink => {
  return {
    type: SHARE_LINK
  }
}
