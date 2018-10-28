import { ThunkDispatch } from "redux-thunk";
// import { push, RouterAction } from 'connected-react-router';
import { API_URL as URL } from "../envConstants";

import { CLOSE_ALERT } from "../constants";
import { DashboardProps, StoreState } from "../types";
import {
  CLOSE_PROMPT,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_PROMPT,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  UPDATE_TOKEN
} from "./constants";

export interface CreateAccount {
  type:
    | CREATE_ACCOUNT_REQUEST
    | CREATE_ACCOUNT_SUCCESS
    | CREATE_ACCOUNT_FAILURE;
  payload?: { success: boolean; accountName: string };
}

export interface LogIn {
  type: LOG_IN_REQUEST | LOG_IN_SUCCESS | LOG_IN_FAILURE;
  payload?: {
    success: boolean;
    accountName: string;
    dashboard?: DashboardProps;
  };
}

export interface LogInPrompt {
  type: LOG_IN_PROMPT;
}

export interface ClosePrompt {
  type: CLOSE_PROMPT;
}

export interface LogOut {
  type: LOG_OUT_REQUEST | LOG_OUT_SUCCESS | LOG_OUT_FAILURE;
  payload?: { success: boolean };
}

export interface UpdateToken {
  type: UPDATE_TOKEN;
  payload: { success: boolean; token: string };
}
export interface CloseAlert {
  type: CLOSE_ALERT;
}

export type AuthAction =
  | CreateAccount
  | LogIn
  | LogOut
  | UpdateToken
  | LogInPrompt
  | ClosePrompt
  | CloseAlert;

export const createAccount = (accountName: string, password: string) => {
  return async (dispatch: ThunkDispatch<StoreState, void, CreateAccount>) => {
    const data = {
      accountName,
      password
    };

    dispatch({
      type: CREATE_ACCOUNT_REQUEST
    });

    try {
      const response = await fetch(`${URL}/auth/createAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      dispatch({
        type: CREATE_ACCOUNT_SUCCESS,
        payload: { success: body.success, accountName }
      });
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: CREATE_ACCOUNT_FAILURE
      });
    }
  };
};

export const logIn = (accountName: string, password: string) => {
  return async (dispatch: ThunkDispatch<StoreState, void, LogIn>) => {
    const data = {
      accountName,
      password
    };

    dispatch({
      type: LOG_IN_REQUEST
    });

    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      dispatch({
        type: LOG_IN_SUCCESS,
        payload: { success: body.success, accountName }
      });
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: LOG_IN_FAILURE
      });
    }
  };
};

export const updateToken = (newToken: string): UpdateToken => {
  return {
    type: UPDATE_TOKEN,
    payload: { success: true, token: newToken }
  };
};

export const logInPrompt = (): LogInPrompt => {
  return {
    type: LOG_IN_PROMPT
  };
};

export const closePrompt = (): ClosePrompt => {
  return {
    type: CLOSE_PROMPT
  };
};

// TODO:
export const logOut = (): LogOut => {
  // clear token somehow
  // send token to server, change salt, remove token
  return {
    type: LOG_OUT_SUCCESS
  };
};

export const closeAlert = (): CloseAlert => {
  return {
    type: CLOSE_ALERT
  };
};
