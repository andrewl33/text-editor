import { ThunkDispatch } from "redux-thunk";
import {
  CLOSE_ALERT,
  CLOSE_PROMPT,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  GET_DASHBOARD_FAILURE,
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_PROMPT,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  UPDATE_TOKEN
} from "../constants";
import { API_URL as URL } from "../envConstants";
import { DashboardProps, StoreState } from "../types";
import authFetch from "../util/authFetch";
import modDate from "../util/modDate";

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
  };
}

export interface GetDashboard {
  type: GET_DASHBOARD_FAILURE | GET_DASHBOARD_REQUEST | GET_DASHBOARD_SUCCESS;
  payload?: {
    success: boolean;
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
  | GetDashboard
  | LogOut
  | UpdateToken
  | LogInPrompt
  | ClosePrompt
  | CloseAlert;

export const createAccount = (accountName: string, password: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, CreateAccount>,
    getState: () => StoreState
  ) => {
    const data = {
      accountName,
      password
    };

    dispatch({
      type: CREATE_ACCOUNT_REQUEST
    });

    try {
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/auth/create`,
        "POST",
        getState().authentication.token,
        data
      );

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

export const getDashboard = () => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, GetDashboard>,
    getState: () => StoreState
  ) => {
    dispatch({
      type: GET_DASHBOARD_REQUEST
    });

    try {
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/account/dashboard`,
        "GET",
        getState().authentication.token
      );

      if (body.success) {
        body.dashboard.collections.forEach((collection: any) => {
          collection.date = modDate(collection.createDate);
          delete collection.createDate;
        });
        body.dashboard.files.forEach((file: any) => {
          file.date = modDate(file.createDate);
          delete file.createDate;
        });

        dispatch({
          type: GET_DASHBOARD_SUCCESS,
          payload: { success: true, dashboard: body.dashboard }
        });
      } else {
        dispatch({
          type: GET_DASHBOARD_FAILURE
        });
      }
    } catch (e) {
      // tslint:disable-next-line
      console.log(e);
      dispatch({
        type: GET_DASHBOARD_FAILURE
      });
    }
  };
};

export const logIn = (accountName: string, password: string) => {
  return async (
    dispatch: ThunkDispatch<StoreState, void, LogIn>,
    getState: () => StoreState
  ) => {
    const data = {
      accountName,
      password
    };

    dispatch({
      type: LOG_IN_REQUEST
    });

    try {
      const body = await authFetch<any, any>(
        dispatch,
        `${URL}/auth/login`,
        "POST",
        getState().authentication.token,
        data
      );

      if (body.success) {
        dispatch({
          type: LOG_IN_SUCCESS,
          payload: { success: true, accountName }
        });
        dispatch(getDashboard());
      } else {
        dispatch({
          type: LOG_IN_FAILURE
        });
      }
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
