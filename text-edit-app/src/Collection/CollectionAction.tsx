// TODO: delete maybe

import { push, RouterAction } from "connected-react-router";
import { ThunkDispatch } from "redux-thunk";
import { API_URL as URL } from "../envConstants";

import { CLOSE_ALERT, SHARE_LINK } from "../constants";
import { CollectionComponentProps, Item, StoreState } from "../types";
import {
  ADD_FILE_TO_COLLECTION_FAILURE,
  ADD_FILE_TO_COLLECTION_REQUEST,
  ADD_FILE_TO_COLLECTION_SUCCESS,
  ADD_USER_TO_COLLECTION_FAILURE,
  ADD_USER_TO_COLLECTION_REQUEST,
  ADD_USER_TO_COLLECTION_SUCCESS,
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
  REMOVE_FILE_FROM_COLLECTION_FAILURE,
  REMOVE_FILE_FROM_COLLECTION_REQUEST,
  REMOVE_FILE_FROM_COLLECTION_SUCCESS,
  REMOVE_USER_FROM_COLLECTION_FAILURE,
  REMOVE_USER_FROM_COLLECTION_REQUEST,
  REMOVE_USER_FROM_COLLECTION_SUCCESS
} from "./constants";

export interface NewCollection {
  type:
    | NEW_COLLECTION_REQUEST
    | NEW_COLLECTION_SUCCESS
    | NEW_COLLECTION_FAILURE;
  payload?: { success: boolean; createDate: string };
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
  };
}

export interface LockCollection {
  type:
    | LOCK_COLLECTION_REQUEST
    | LOCK_COLLECTION_SUCCESS
    | LOCK_COLLECTION_FAILURE;
  payload?: { success: boolean };
}

export interface AddFileToCollection {
  type:
    | ADD_FILE_TO_COLLECTION_FAILURE
    | ADD_FILE_TO_COLLECTION_REQUEST
    | ADD_FILE_TO_COLLECTION_SUCCESS;
  payload?: { success: boolean; newFileItem: Item };
}

export interface RemoveFileFromCollection {
  type:
    | REMOVE_FILE_FROM_COLLECTION_FAILURE
    | REMOVE_FILE_FROM_COLLECTION_REQUEST
    | REMOVE_FILE_FROM_COLLECTION_SUCCESS;
  payload?: { success: boolean; fileId: string };
}

export interface AddUserToCollection {
  type:
    | ADD_USER_TO_COLLECTION_REQUEST
    | ADD_USER_TO_COLLECTION_SUCCESS
    | ADD_USER_TO_COLLECTION_FAILURE;
  payload?: { success: boolean; accountName?: string };
}

export interface RemoveUserFromCollection {
  type:
    | REMOVE_USER_FROM_COLLECTION_REQUEST
    | REMOVE_USER_FROM_COLLECTION_SUCCESS
    | REMOVE_USER_FROM_COLLECTION_FAILURE;
  payload?: { success: boolean; accountName?: string };
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
  | AddUserToCollection
  | RemoveUserFromCollection
  | LockCollection
  | AddFileToCollection
  | RemoveFileFromCollection
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
        dispatch({
          type: NEW_COLLECTION_SUCCESS,
          payload: { success: body.sucess, createDate: body.createDate }
        });
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
          payload: {
            success: body.success
          }
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

export const addFileToCollection = (fileId: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, AddFileToCollection>,
    getState: () => StoreState
  ) => {
    const data = {
      url: getState().router.location.pathname,
      fileId
    };

    dispatch({
      type: ADD_FILE_TO_COLLECTION_REQUEST
    });

    try {
      const response = await fetch(`${URL}/collection/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      dispatch({
        type: ADD_FILE_TO_COLLECTION_SUCCESS,
        payload: { success: body.success, newFileItem: body.fileItem }
      });
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: ADD_FILE_TO_COLLECTION_FAILURE
      });
    }
  };
};

export const removeFileFromCollection = (fileId: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, RemoveFileFromCollection>,
    getState: () => StoreState
  ) => {
    const data = {
      url: getState().router.location.pathname,
      fileId
    };

    dispatch({
      type: REMOVE_FILE_FROM_COLLECTION_REQUEST
    });

    try {
      const response = await fetch(`${URL}/collection/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      dispatch({
        type: REMOVE_FILE_FROM_COLLECTION_SUCCESS,
        payload: { success: body.success, fileId }
      });
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: REMOVE_FILE_FROM_COLLECTION_FAILURE
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

export const authCollection = (password: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, AuthCollection>,
    getState: () => StoreState
  ) => {
    dispatch({ type: AUTH_COLLECTION_REQUEST });

    try {
      const data = { password, url: getState().router.location.pathname };
      const response = await fetch(`${URL}/collection/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: AUTH_COLLECTION_SUCCESS,
          payload: {
            success: true
          }
        });
      } else {
        dispatch({
          type: AUTH_COLLECTION_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: AUTH_COLLECTION_FAILURE });
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

export const addUserToCollection = (accountName: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, AddUserToCollection>,
    getState: () => StoreState
  ) => {
    dispatch({ type: ADD_USER_TO_COLLECTION_REQUEST });

    try {
      const data = { accountName, url: getState().router.location.pathname };
      const response = await fetch(`${URL}/account/addCollection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: ADD_USER_TO_COLLECTION_SUCCESS,
          payload: {
            success: true,
            accountName
          }
        });
      } else {
        dispatch({
          type: ADD_USER_TO_COLLECTION_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: ADD_USER_TO_COLLECTION_FAILURE });
    }
  };
};

export const removeUserFromCollection = (accountName: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, RemoveUserFromCollection>,
    getState: () => StoreState
  ) => {
    dispatch({ type: REMOVE_USER_FROM_COLLECTION_REQUEST });

    try {
      const data = { accountName, url: getState().router.location.pathname };
      const response = await fetch(`${URL}/account/addCollection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if (body.success) {
        dispatch({
          type: REMOVE_USER_FROM_COLLECTION_SUCCESS,
          payload: {
            success: true,
            accountName
          }
        });
      } else {
        dispatch({
          type: REMOVE_USER_FROM_COLLECTION_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: REMOVE_USER_FROM_COLLECTION_FAILURE });
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
