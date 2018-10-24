// TODO: auth
// TODO: delete maybe
// TODO: add
// TODO: remove

import { push, RouterAction } from "connected-react-router";
import { ThunkDispatch } from "redux-thunk";
import { API_URL as URL } from "../envConstants";

import { CLOSE_ALERT, SHARE_LINK } from "../constants";
import { CollectionComponentProps, StoreState } from "../types";
import {
  ADD_FILE_FAILURE,
  ADD_FILE_REQUEST,
  ADD_FILE_SUCCESS,
  AUTH_COLLECTION_FAILURE,
  AUTH_COLLECTION_REQUEST,
  AUTH_COLLECTION_SUCCESS,
  CHANGE_COLLECTION_NAME_FAILURE,
  CHANGE_COLLECTION_NAME_REQUEST,
  CHANGE_COLLECTION_NAME_SUCCESS,
  GET_COLLECTION_FAILURE,
  GET_COLLECTION_REQUEST,
  GET_COLLECTION_SUCCESS,
  LOCK_COLLECTION_FAILURE,
  LOCK_COLLECTION_REQUEST,
  LOCK_COLLECTION_SUCCESS,
  NEW_COLLECTION_FAILURE,
  NEW_COLLECTION_REQUEST,
  NEW_COLLECTION_SUCCESS,
  REMOVE_FILE_FAILURE,
  REMOVE_FILE_REQUEST,
  REMOVE_FILE_SUCCESS
} from "./constants";

export interface NewCollection {
  type:
    | NEW_COLLECTION_REQUEST
    | NEW_COLLECTION_SUCCESS
    | NEW_COLLECTION_FAILURE;
  payload?: boolean;
}

export interface GetCollection {
  type:
    | GET_COLLECTION_REQUEST
    | GET_COLLECTION_SUCCESS
    | GET_COLLECTION_FAILURE;
  payload?: {
    success: boolean;
    items?: CollectionComponentProps;
    createDate?: string;
    name?: string;
    isLocked?: boolean;
  };
}

export interface AuthCollection {
  type:
    | AUTH_COLLECTION_REQUEST
    | AUTH_COLLECTION_SUCCESS
    | AUTH_COLLECTION_FAILURE;
  payload?: {
    success: boolean;
    message: string;
  };
}

export interface LockCollection {
  type:
    | LOCK_COLLECTION_REQUEST
    | LOCK_COLLECTION_SUCCESS
    | LOCK_COLLECTION_FAILURE;
  payload?: boolean;
}

export interface AddFile {
  type: ADD_FILE_REQUEST | ADD_FILE_SUCCESS | ADD_FILE_FAILURE;
  payload?: boolean;
}

export interface RemoveFile {
  type: REMOVE_FILE_REQUEST | REMOVE_FILE_SUCCESS | REMOVE_FILE_FAILURE;
  payload?: boolean;
}

export interface ChangeCollectionName {
  type:
    | CHANGE_COLLECTION_NAME_REQUEST
    | CHANGE_COLLECTION_NAME_SUCCESS
    | CHANGE_COLLECTION_NAME_FAILURE;
  payload?: { success: boolean; name?: string };
}

export interface ShareLink {
  type: SHARE_LINK;
}

export interface CloseAlert {
  type: CLOSE_ALERT;
}

export type CollectionAction =
  | NewCollection
  | GetCollection
  | AuthCollection
  | LockCollection
  | AddFile
  | RemoveFile
  | ChangeCollectionName
  | ShareLink
  | CloseAlert;

export const newCollection = () => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, NewCollection | RouterAction>
  ) => {
    dispatch({ type: NEW_COLLECTION_REQUEST });

    try {
      const response = await fetch(`${URL}/generate`);
      const body = await response.json();
      if (body.success) {
        dispatch(push("/collection/" + body.url));
        dispatch({ type: NEW_COLLECTION_SUCCESS, payload: body.success });
      } else {
        dispatch({ type: NEW_COLLECTION_SUCCESS, payload: body.success });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: NEW_COLLECTION_FAILURE });
    }
  };
};

export const getCollectionFiles = () => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, GetCollection>,
    getState: () => StoreState
  ) => {
    const data = { url: getState().router.location.pathname };

    dispatch({
      type: GET_COLLECTION_REQUEST
    });

    try {
      const response = await fetch(`${URL}/collection/open`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if (body.success) {
        dispatch({
          type: GET_COLLECTION_SUCCESS,
          payload: {
            success: body.success,
            items: body.items,
            name: body.createDate,
            createDate: body.createDate,
            isLocked: body.isLocked
          }
        });
      } else {
        dispatch({
          type: GET_COLLECTION_SUCCESS,
          payload: { success: body.success }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: GET_COLLECTION_FAILURE
      });
    }
  };
};

export const lockCollection = (password: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, LockCollection>,
    getState: () => StoreState
  ) => {
    const data = {
      url: getState().router.location.pathname,
      password
    };

    dispatch({
      type: LOCK_COLLECTION_REQUEST
    });

    try {
      const response = await fetch(`${URL}/collection/lock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      dispatch({
        type: LOCK_COLLECTION_SUCCESS,
        payload: body.success
      });
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: LOCK_COLLECTION_FAILURE
      });
    }
  };
};

export const changeCollectionName = (newName: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, ChangeCollectionName>,
    getState: () => StoreState
  ) => {
    dispatch({ type: CHANGE_COLLECTION_NAME_REQUEST });

    try {
      const data = { name: newName, url: getState().router.location.pathname };
      const response = await fetch(`${URL}/collection/updateName`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: CHANGE_COLLECTION_NAME_SUCCESS,
          payload: {
            success: true,
            name: newName
          }
        });
      } else {
        dispatch({
          type: CHANGE_COLLECTION_NAME_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: CHANGE_COLLECTION_NAME_FAILURE });
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
