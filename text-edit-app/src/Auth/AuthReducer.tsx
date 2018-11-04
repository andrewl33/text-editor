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
import { AuthStoreState } from "../types";
import { AuthAction } from "./AuthAction";

export const initialState: AuthStoreState = {
  token: undefined,
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
      return state;
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        accountName: action.payload && action.payload.accountName
      };
    case CREATE_ACCOUNT_FAILURE:
      return state;

    case LOG_IN_REQUEST:
      return state;
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        accountName: action.payload && action.payload.accountName,
        authPrompt: false
      };
    case LOG_IN_FAILURE:
      return { ...state, openAlert: true, alertMessage: "Wrong account info" };

    case GET_DASHBOARD_REQUEST:
      return state;
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload && action.payload.dashboard
      };
    case GET_DASHBOARD_FAILURE:
      return { ...state, openAlert: true, alertMessage: "Not logged in" };

    case LOG_OUT_REQUEST:
      return state;
    case LOG_OUT_SUCCESS:
      return initialState;
    case LOG_OUT_FAILURE:
      return state;

    case UPDATE_TOKEN:
      return { ...state, token: action.payload.token };

    case LOG_IN_PROMPT:
      return { ...state, authPrompt: true };

    case CLOSE_PROMPT:
      return { ...state, authPrompt: false };

    case CLOSE_ALERT:
      return { ...state, openAlert: false };

    default:
      return state;
  }
};
