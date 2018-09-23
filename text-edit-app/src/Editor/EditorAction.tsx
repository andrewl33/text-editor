import { ThunkDispatch } from 'redux-thunk';
import { push, RouterAction } from 'connected-react-router';

import { 
  UPDATE_CODE_REQUEST, UPDATE_CODE_SUCCESS, UPDATE_CODE_FAILURE, 
  CHANGED_CODE, GET_TEXT_REQUEST, GET_TEXT_SUCCESS, GET_TEXT_FAILURE, 
  NEW_TEXT_REQUEST, NEW_TEXT_SUCCESS, NEW_TEXT_FAILURE, 
  LOCK_TEXT, SHARE_LINK, CLOSE_ALERT
} from '../constants';
import { StoreState } from '../types';

const URL = "http://localhost:3300";

export interface UpdateCode{
  type: UPDATE_CODE_REQUEST | UPDATE_CODE_SUCCESS | UPDATE_CODE_FAILURE;
  payload?: string;
}

export interface ChangedCode {
  type: CHANGED_CODE;
}

export interface GetText {
  type: GET_TEXT_REQUEST | GET_TEXT_SUCCESS | GET_TEXT_FAILURE;
  payload?: string;
}

export interface NewText {
  type: NEW_TEXT_REQUEST | NEW_TEXT_SUCCESS | NEW_TEXT_FAILURE;
}

export interface LockText {
  type: LOCK_TEXT;
}

export interface ShareLink {
  type: SHARE_LINK;
}

export interface CloseAlert {
  type: CLOSE_ALERT;
}

export type EditorAction =  UpdateCode | ChangedCode | GetText | NewText | LockText | ShareLink | CloseAlert;

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
        dispatch({
          type: GET_TEXT_SUCCESS,
          payload: body.codeText
        });
      } else {
        dispatch({
          type: GET_TEXT_FAILURE
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


// need to find a way to update spam ShareLink
// function checkAlertState(dispatch: any, getState: () => StoreState) {
//   if (getState().editor.openAlert) {
//     dispatch(closeAlert);
//   }
// }