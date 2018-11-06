import { push, RouterAction } from "connected-react-router";
import { ThunkDispatch } from "redux-thunk";
import {
  ADD_TAG_FAILURE,
  ADD_TAG_REQUEST,
  ADD_TAG_SUCCESS,
  ADD_USER_TO_FILE_FAILURE,
  ADD_USER_TO_FILE_REQUEST,
  ADD_USER_TO_FILE_SUCCESS,
  AUTH_FILE_FAILURE,
  AUTH_FILE_REQUEST,
  AUTH_FILE_SUCCESS,
  CHANGE_FILE_NAME_FAILURE,
  CHANGE_FILE_NAME_REQUEST,
  CHANGE_FILE_NAME_SUCCESS,
  CHANGED_CODE,
  CLOSE_ALERT,
  GET_TEXT_AUTH,
  GET_TEXT_FAILURE,
  GET_TEXT_REQUEST,
  GET_TEXT_SUCCESS,
  LOCAL_UPDATE_CODE,
  LOCK_TEXT_FAILURE,
  LOCK_TEXT_REQUEST,
  LOCK_TEXT_SUCCESS,
  NEW_TEXT_FAILURE,
  NEW_TEXT_REQUEST,
  NEW_TEXT_SUCCESS,
  REMOVE_TAG_FAILURE,
  REMOVE_TAG_REQUEST,
  REMOVE_TAG_SUCCESS,
  REMOVE_USER_FROM_FILE_FAILURE,
  REMOVE_USER_FROM_FILE_REQUEST,
  REMOVE_USER_FROM_FILE_SUCCESS,
  SHARE_LINK,
  UPDATE_CODE_FAILURE,
  UPDATE_CODE_REQUEST,
  UPDATE_CODE_SUCCESS
} from "../constants";
import { API_URL as URL } from "../envConstants";
import { StoreState } from "../types";
import authFetch from "../util/authFetch";
import modDate from "../util/modDate";

export interface LocalUpdateCode {
  type: LOCAL_UPDATE_CODE;
  payload: { codeText: string };
}
export interface UpdateCode {
  type: UPDATE_CODE_REQUEST | UPDATE_CODE_SUCCESS | UPDATE_CODE_FAILURE;
  payload?: { success: boolean };
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
      isLocked: boolean;
      users: string[];
    };
  };
}

export interface NewText {
  type: NEW_TEXT_REQUEST | NEW_TEXT_SUCCESS | NEW_TEXT_FAILURE;
  payload?: { success: boolean };
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

export interface AddUserToFile {
  type:
    | ADD_USER_TO_FILE_FAILURE
    | ADD_USER_TO_FILE_REQUEST
    | ADD_USER_TO_FILE_SUCCESS;
  payload?: {
    success: boolean;
    accountName?: string;
  };
}

export interface RemoveUserFromFile {
  type:
    | REMOVE_USER_FROM_FILE_FAILURE
    | REMOVE_USER_FROM_FILE_REQUEST
    | REMOVE_USER_FROM_FILE_SUCCESS;
  payload?: {
    success: boolean;
    accountName?: string;
  };
}

export interface ShareLink {
  type: SHARE_LINK;
}

export interface CloseAlert {
  type: CLOSE_ALERT;
}

export type EditorAction =
  | LocalUpdateCode
  | UpdateCode
  | ChangedCode
  | GetText
  | NewText
  | LockText
  | AuthFile
  | AddTag
  | RemoveTag
  | ChangeFileName
  | AddUserToFile
  | RemoveUserFromFile
  | ShareLink
  | CloseAlert;

export const localUpdateCode = (codeText: string): LocalUpdateCode => {
  return {
    type: LOCAL_UPDATE_CODE,
    payload: { codeText }
  };
};

export const updateCode = () => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, UpdateCode>,
    getState: () => StoreState
  ) => {
    const data = {
      url: getState()
        .router.location.pathname.split("/")
        .pop(),
      pageType: "file",
      codeText: getState().editor.codeText
    };
    dispatch({
      type: UPDATE_CODE_REQUEST
    });

    try {
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/save`,
        "PUT",
        getState().authentication.token,
        data
      );

      if (body.isSaved) {
        dispatch({
          type: UPDATE_CODE_SUCCESS,
          payload: { success: body.isSaved }
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
    const data = {
      url: getState()
        .router.location.pathname.split("/")
        .pop(),
      pageType: "file"
    };

    dispatch({
      type: GET_TEXT_REQUEST
    });

    try {
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/open`,
        "POST",
        getState().authentication.token,
        data
      );

      if (body.success) {
        dispatch({
          type: GET_TEXT_SUCCESS,
          payload: {
            success: true,
            body: {
              codeText: body.codeText,
              tags: body.tags,
              name: body.name,
              createDate: modDate(body.createDate),
              isLocked: body.isPrivate,
              users: body.users
            }
          }
        });
      } else if (body.password) {
        dispatch({
          type: GET_TEXT_AUTH
        });
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
      const data = {
        url: getState()
          .router.location.pathname.split("/")
          .pop(),
        pageType: "file",
        password
      };
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/lock`,
        "POST",
        getState().authentication.token,
        data
      );
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

export const addTag = (newTag: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, AddTag>,
    getState: () => StoreState
  ) => {
    dispatch({ type: ADD_TAG_REQUEST });

    try {
      const data = {
        url: getState()
          .router.location.pathname.split("/")
          .pop(),
        pageType: "file",
        tagName: newTag
      };

      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/addTag`,
        "POST",
        getState().authentication.token,
        data
      );

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
      const response = await fetch(`${URL}/file/generate`);
      const body = await response.json();
      if (body.success) {
        dispatch(push("/files/" + body.url));
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
      const data = {
        tagName: removedTag,
        url: getState()
          .router.location.pathname.split("/")
          .pop(),
        pageType: "file"
      };

      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/removeTag`,
        "DELETE",
        getState().authentication.token,
        data
      );

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
      const data = {
        url: getState()
          .router.location.pathname.split("/")
          .pop(),
        password,
        pageType: "file"
      };
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/auth/authFile`,
        "POST",
        getState().authentication.token,
        data
      );

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
        dispatch({ type: AUTH_FILE_FAILURE });
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
      const data = {
        name: newName,
        url: getState()
          .router.location.pathname.split("/")
          .pop(),
        pageType: "file"
      };
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/updateName`,
        "POST",
        getState().authentication.token,
        data
      );
      // tslint:disable-next-line
      console.log(body);
      if (body.success) {
        dispatch({
          type: CHANGE_FILE_NAME_SUCCESS,
          payload: {
            success: true,
            name: newName
          }
        });
      } else {
        dispatch({
          type: CHANGE_FILE_NAME_FAILURE
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: CHANGE_FILE_NAME_FAILURE });
    }
  };
};

// TODO: add
export const addUserToFile = (accountName: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, AddUserToFile>,
    getState: () => StoreState
  ) => {
    dispatch({ type: ADD_USER_TO_FILE_REQUEST });

    try {
      const data = {
        accountName,
        url: getState()
          .router.location.pathname.split("/")
          .pop(),
        pageType: "file"
      };
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/addUser`,
        "POST",
        getState().authentication.token,
        data
      );
      if (body.success) {
        dispatch({
          type: ADD_USER_TO_FILE_SUCCESS,
          payload: {
            success: true,
            accountName
          }
        });
      } else {
        dispatch({
          type: ADD_USER_TO_FILE_FAILURE
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: ADD_USER_TO_FILE_FAILURE });
    }
  };
};

// TODO: add
export const removeUserFromFile = (accountName: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, RemoveUserFromFile>,
    getState: () => StoreState
  ) => {
    dispatch({ type: REMOVE_USER_FROM_FILE_REQUEST });

    try {
      const data = {
        accountName,
        url: getState()
          .router.location.pathname.split("/")
          .pop(),
        pageType: "file"
      };

      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/file/removeUser`,
        "POST",
        getState().authentication.token,
        data
      );
      if (body.success) {
        dispatch({
          type: REMOVE_USER_FROM_FILE_SUCCESS,
          payload: {
            success: true,
            accountName
          }
        });
      } else {
        dispatch({
          type: REMOVE_USER_FROM_FILE_SUCCESS,
          payload: {
            success: false
          }
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({ type: REMOVE_USER_FROM_FILE_FAILURE });
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
