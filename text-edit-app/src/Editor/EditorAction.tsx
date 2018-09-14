import { ThunkDispatch } from 'redux-thunk';
import { push, RouterAction } from 'connected-react-router';

import { UPDATE_CODE, CHANGED_CODE, GET_TEXT, NEW_TEXT, LOCK_TEXT, SHARE_LINK} from '../constants';
import { StoreState } from '../types';

const URL = "http://localhost:3300";

export interface UpdateCode{
  type: UPDATE_CODE;
  payload: string;
}

export interface ChangedCode {
  type: CHANGED_CODE;
}

export interface GetText {
  type: GET_TEXT;
  payload: string;
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

export type EditorAction =  UpdateCode | ChangedCode | GetText | NewText | LockText | ShareLink;

export const updateCode = (codeText: string) => {
  return async (dispatch: ThunkDispatch<StoreState, void, UpdateCode>, getState: () => StoreState) => {
    const data = {url: getState().router.location.pathname, codeText };
    
    try {
      await fetch(`${URL}/save`, {
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
      // tslint:disable-next-line
      console.log(e);
    }
  }
}


export const changedCode = (): ChangedCode => {
  return {
    type: CHANGED_CODE
  }
}

export const getText = () => {
  
  return async (dispatch: ThunkDispatch<StoreState, void, GetText>, getState: () => StoreState) => {
    
    const data = {url: getState().router.location.pathname };

    try {
      const response = await fetch(
        `${URL}/open`, {
          'method': 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(data)
        });
      const body = await response.json();
      dispatch({
        type: GET_TEXT,
        payload: body.codeText
      })
    } catch(e) {
      // tslint:disable-next-line
      console.log(e);
    }


  }
}

export const lockText = (): LockText => {
  // nothing yet
  return {
    type: LOCK_TEXT
  }
}

export const newText = () => {

  return async (dispatch: ThunkDispatch<StoreState, void, NewText | RouterAction>) => {
    try {
      const response = await fetch(`${URL}/generate`);
      const body = await response.json();
      dispatch(push(body.url));
      dispatch({type: NEW_TEXT});
    } catch(e) {
      // tslint:disable-next-line
      console.log(e);
    }

  }

}

export const shareLink = (): ShareLink => {
  return {
    type: SHARE_LINK
  }
}
