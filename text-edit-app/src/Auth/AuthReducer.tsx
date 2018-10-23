import { AuthAction } from "./AuthAction";

import { CLOSE_ALERT } from "../constants";
import { AuthStoreState } from "../types";
import {
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS
} from "./constants";

export const initialState: AuthStoreState = {
  loggedIn: false,
  accountName: undefined,
  dashboard: undefined,
  openAlert: false,
  alertMessage: undefined,
  authPrompt: false
};

export const authReducer = (
  state: AuthStoreState = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
      return { ...state };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        accountName: action.payload && action.payload.accountName
      };
    case CREATE_ACCOUNT_FAILURE:
      return { ...state };

    case LOG_IN_REQUEST:
      return { ...state };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        accountName: action.payload && action.payload.accountName,
        dashboard: action.payload && action.payload.dashboard
      };
    case LOG_IN_FAILURE:
      return { ...state };

    case LOG_OUT_REQUEST:
      return { ...state };
    case LOG_OUT_SUCCESS:
      return { ...initialState };
    case LOG_OUT_FAILURE:
      return { ...state };

    case CLOSE_ALERT:
      return { ...state, openAlert: false };

    default:
      return state;
  }
};
