import { push, RouterAction } from "connected-react-router";
import { ThunkDispatch } from "redux-thunk";
import { API_URL as URL } from "../envConstants";

import { CLOSE_ALERT, SHARE_LINK } from "../constants";
import { StoreState } from "../types";
import {
  ADD_TAG_FAILURE,
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS,
  AUTH_FILE_FAILURE,
  AUTH_FILE_REQUEST,
  AUTH_FILE_SUCCESS,
  CHANGE_FILE_NAME_FAILURE,
  CHANGE_FILE_NAME_REQUEST,
  CHANGE_FILE_NAME_SUCCESS,
  CHANGED_CODE,
  GET_TEXT_AUTH,
  GET_TEXT_FAILURE,
  GET_TEXT_REQUEST,
  GET_TEXT_SUCCESS,
  LOCK_TEXT_FAILURE,
  LOCK_TEXT_REQUEST,
  LOCK_TEXT_SUCCESS,
  NEW_TEXT_FAILURE,
  NEW_TEXT_REQUEST,
  NEW_TEXT_SUCCESS,
  REMOVE_TAG_FAILURE,
  REMOVE_TAG_REQUEST,
  REMOVE_TAG_SUCCESS,
  UPDATE_CODE_FAILURE,
  UPDATE_CODE_REQUEST,
  UPDATE_CODE_SUCCESS
} from "./constants";

export interface UpdateCode {
  type: UPDATE_CODE_REQUEST | UPDATE_CODE_SUCCESS | UPDATE_CODE_FAILURE;
  payload?: { success: boolean; codeText: string };
}

export interface ChangedCode {
  type: CHANGED_CODE;
}

export interface GetText {
  type: GET_TEXT_REQUEST | GET_TEXT_SUCCESS | GET_TEXT_FAILURE | GET_TEXT_AUTH;
  payload?: {
    success: boolean;
    body?: {
      name: string;
      codeText: string;
      tags: string[];
      createDate: string;
    };
  };
}

export interface NewText {
  type: NEW_TEXT_REQUEST | NEW_TEXT_SUCCESS | NEW_TEXT_FAILURE;
}

export interface LockText {
  type: LOCK_TEXT_FAILURE | LOCK_TEXT_REQUEST | LOCK_TEXT_SUCCESS;
  payload?: { success: boolean; message: string };
}

export interface AuthFile {
  type: AUTH_FILE_REQUEST | AUTH_FILE_SUCCESS | AUTH_FILE_FAILURE;
  payload?: { success: boolean; message: string };
}

export interface AddTag {
  type: ADD_TAG_REQUEST | ADD_TAG_SUCCESS | ADD_TAG_FAILURE;
  payload?: { success: boolean; name?: string };
}

export interface RemoveTag {
  type: REMOVE_TAG_REQUEST | REMOVE_TAG_SUCCESS | REMOVE_TAG_FAILURE;
  payload?: { success: boolean; name?: string };
}

export interface ChangeFileName {
  type:
    | CHANGE_FILE_NAME_REQUEST
    | CHANGE_FILE_NAME_SUCCESS
    | CHANGE_FILE_NAME_FAILURE;
  payload?: { success: boolean; name?: string };
}

export interface ShareLink {
  type: SHARE_LINK;
}

export interface CloseAlert {
  type: CLOSE_ALERT;
}

export type EditorAction =
  | UpdateCode
  | ChangedCode
  | GetText
  | NewText
  | LockText
  | AuthFile
  | AddTag
  | RemoveTag
  | ChangeFileName
  | ShareLink
  | CloseAlert;

export const updateCode = (codeText: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, UpdateCode>,
    getState: () => StoreState
  ) => {
    const data = { url: getState().router.location.pathname, codeText };

    dispatch({
      type: UPDATE_CODE_REQUEST
    });

    try {
      const response: Response = await fetch(`${URL}/save`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      const body = await response.json();

      if (body.isSaved) {
        dispatch({
          type: UPDATE_CODE_SUCCESS,
          payload: { success: body.isSaved, codeText }
        });
      } else {
        dispatch({
          type: UPDATE_CODE_FAILURE
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: UPDATE_CODE_FAILURE
      });
    }
  };
};

export const changedCode = (): ChangedCode => {
  return {
    type: CHANGED_CODE
  };
};

export const getText = () => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, GetText>,
    getState: () => StoreState
  ) => {
    const data = { url: getState().router.location.pathname };

    dispatch({
      type: GET_TEXT_REQUEST
    });

    try {
      const response = await fetch(`${URL}/open`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if (body.success) {
        if (body.password) {
          dispatch({
            type: GET_TEXT_AUTH
          });
        } else {
          dispatch({
            type: GET_TEXT_SUCCESS,
            payload: {
              success: true,
              body: {
                codeText: body.codeText,
                tags: body.tags,
                name: body.name,
                createDate: body.createDate
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
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: GET_TEXT_FAILURE
      });
    }
  };
};

export const lockText = (password: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, LockText>,
    getState: () => StoreState
  ) => {
    dispatch({ type: LOCK_TEXT_REQUEST });

    try {
      const data = { url: getState().router.location.pathname, password };
      const response = await fetch(`${URL}/file/lock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: LOCK_TEXT_SUCCESS,
          payload: {
            success: body.success,
            message: "Authenticated"
          }
        });
      } else {
        dispatch({
          type: LOCK_TEXT_FAILURE,
          payload: {
            success: body.success,
            message: "Wrong password"
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: LOCK_TEXT_FAILURE });
    }
  };
};

// TODO: find parameters
export const addTag = (newTag: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, AddTag>,
    getState: () => StoreState
  ) => {
    dispatch({ type: ADD_TAG_REQUEST });

    try {
      const data = { newTag, url: getState().router.location.pathname };
      const response = await fetch(`${URL}/file/addTag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: ADD_TAG_SUCCESS,
          payload: {
            success: true,
            name: newTag
          }
        });
      } else {
        dispatch({
          type: ADD_TAG_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: ADD_TAG_FAILURE });
    }
  };
};

export const newText = () => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, NewText | RouterAction>
  ) => {
    dispatch({ type: NEW_TEXT_REQUEST });

    try {
      const response = await fetch(`${URL}/generate`);
      const body = await response.json();
      if (body.success) {
        dispatch(push("/file/" + body.url));
        dispatch({ type: NEW_TEXT_SUCCESS });
      } else {
        dispatch({ type: NEW_TEXT_FAILURE });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: NEW_TEXT_FAILURE });
    }
  };
};

export const removeTag = (removedTag: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, RemoveTag>,
    getState: () => StoreState
  ) => {
    dispatch({ type: REMOVE_TAG_REQUEST });

    try {
      const data = { removedTag, url: getState().router.location.pathname };
      const response = await fetch(`${URL}/file/removeTag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: REMOVE_TAG_SUCCESS,
          payload: {
            success: true,
            name: removedTag
          }
        });
      } else {
        dispatch({
          type: REMOVE_TAG_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: REMOVE_TAG_FAILURE });
    }
  };
};

export const authFile = (password: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, AuthFile>,
    getState: () => StoreState
  ) => {
    dispatch({ type: AUTH_FILE_REQUEST });

    try {
      const data = { url: getState().router.location.pathname, password };
      const response: Response = await fetch(`${URL}/file/auth`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: AUTH_FILE_SUCCESS,
          payload: {
            success: true,
            message: "Authenticated"
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
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: AUTH_FILE_FAILURE });
    }
  };
};

export const changeFileName = (newName: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, ChangeFileName>,
    getState: () => StoreState
  ) => {
    dispatch({ type: CHANGE_FILE_NAME_REQUEST });

    try {
      const data = { name: newName, url: getState().router.location.pathname };
      const response = await fetch(`${URL}/file/updateName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: CHANGE_FILE_NAME_SUCCESS,
          payload: {
            success: true
          }
        });
      } else {
        dispatch({
          type: CHANGE_FILE_NAME_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: CHANGE_FILE_NAME_FAILURE });
    }
  };
};

export const shareLink = (): ShareLink => {
  return {
    type: SHARE_LINK
  };
};

export const closeAlert = (): CloseAlert => {
  return {
    type: CLOSE_ALERT
  };
};

// TODO: Delete ??? probably not

// need to find a way to update spam ShareLink
// function checkAlertState(dispatch: any, getState: () => StoreState) {
//   if (getState().editor.openAlert) {
//     dispatch(closeAlert);
//   }
// }
