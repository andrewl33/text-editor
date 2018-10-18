import { ThunkDispatch } from 'redux-thunk';
import { push, RouterAction } from 'connected-react-router';
import { API_URL as URL } from '../envConstants';

import { 
  UPDATE_CODE_REQUEST, UPDATE_CODE_SUCCESS, UPDATE_CODE_FAILURE, 
  CHANGED_CODE, GET_TEXT_REQUEST, GET_TEXT_SUCCESS, GET_TEXT_FAILURE, GET_TEXT_AUTH,
  NEW_TEXT_REQUEST, NEW_TEXT_SUCCESS, NEW_TEXT_FAILURE, 
  AUTH_FILE_REQUEST, AUTH_FILE_SUCCESS, AUTH_FILE_FAILURE 
} from './constants';
import {  LOCK_TEXT, SHARE_LINK, CLOSE_ALERT } from '../constants';
import { StoreState } from '../types';

export interface UpdateCode {
  type: UPDATE_CODE_REQUEST | UPDATE_CODE_SUCCESS | UPDATE_CODE_FAILURE;
  payload?: string;
}

export interface ChangedCode {
  type: CHANGED_CODE;
}

export interface GetText {
  type: GET_TEXT_REQUEST | GET_TEXT_SUCCESS | GET_TEXT_FAILURE | GET_TEXT_AUTH;
  payload?: {
    success: boolean, 
    body?: {
      codeText: string,
      tags: string[]
    }
  }
}

export interface NewText {
  type: NEW_TEXT_REQUEST | NEW_TEXT_SUCCESS | NEW_TEXT_FAILURE;
}

export interface LockText {
  type: LOCK_TEXT;
}

export interface AuthFile {
  type: AUTH_FILE_REQUEST | AUTH_FILE_SUCCESS | AUTH_FILE_FAILURE;
  payload?: {success: boolean; message: string}; 
}

export interface ShareLink {
  type: SHARE_LINK;
}

export interface CloseAlert {
  type: CLOSE_ALERT;
}

export type EditorAction =  UpdateCode | ChangedCode | GetText | NewText | LockText | AuthFile | ShareLink | CloseAlert;

export const updateCode = (codeText: string) => {
  return async (dispatch: ThunkDispatch<StoreState, void, UpdateCode>, getState: () => StoreState) => {
    const data = { url: getState().router.location.pathname, codeText };

    dispatch({
      type: UPDATE_CODE_REQUEST
    });

    try {
      const response: Response = await fetch(`${URL}/save`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      const body = await response.json();

      if (body.isSaved) {
 
        dispatch({
          type: UPDATE_CODE_SUCCESS,
          payload: codeText
        })
      } else {

        dispatch({
          type: UPDATE_CODE_FAILURE
        });
      }
    } catch(e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: UPDATE_CODE_FAILURE
      });
    }

    // checkAlertState(dispatch, getState);
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

    dispatch({
      type: GET_TEXT_REQUEST
    })

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

      if (body.success) {
        if (body.password) {
          dispatch({
            type: GET_TEXT_AUTH
          })
        } else {
          dispatch({
            type: GET_TEXT_SUCCESS,
            payload: {
              success: true,
              body: {
                codeText: body.codeText,
                tags: body.tags
              }
            }
          });
        }

      } else {
        dispatch({
          type: GET_TEXT_SUCCESS,
          payload: {
            success: false
          }
        });
      }

    } catch(e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: GET_TEXT_FAILURE
      });
    }


  }
}

// TODO: lock
export const lockText = (): LockText => {
  // nothing yet
  return {
    type: LOCK_TEXT
  }
}

export const newText = () => {

  return async (dispatch: ThunkDispatch<StoreState, void, NewText | RouterAction>) => {
    
    dispatch({type: NEW_TEXT_REQUEST});
    
    try {
      const response = await fetch(`${URL}/generate`);
      const body = await response.json();
      if (body.success) {
        dispatch(push(body.url));
        dispatch({type: NEW_TEXT_SUCCESS});
      } else {
        dispatch({type: NEW_TEXT_FAILURE});
      }
    } catch(e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({type: NEW_TEXT_FAILURE});
    }

  }

}

export const authFile = (password: string) => {
  return async (dispatch: ThunkDispatch<StoreState, void, AuthFile>) => {
    
    dispatch({type: AUTH_FILE_REQUEST});
    
    try {
      const response = await fetch(`${URL}/file/auth`);
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: AUTH_FILE_SUCCESS,
          payload: {
            success: true,
            message: 'Authenticated'
          }
        });
        dispatch(getText());
      } else {
        dispatch({
          type: AUTH_FILE_SUCCESS,
          payload: {
            success: false,
            message: "Wrong password"
          }
        })
      }
    } catch(e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({type: AUTH_FILE_FAILURE});
    }

  }

}

export const shareLink = (): ShareLink => {
  return {
    type: SHARE_LINK
  }
}


export const closeAlert = (): CloseAlert => {
  return {
    type: CLOSE_ALERT
  }
}

// TODO: Delete
// TODO: add tag
// TODO: remove tag


// need to find a way to update spam ShareLink
// function checkAlertState(dispatch: any, getState: () => StoreState) {
//   if (getState().editor.openAlert) {
//     dispatch(closeAlert);
//   }
// }