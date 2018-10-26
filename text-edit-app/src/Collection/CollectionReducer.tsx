import { CLOSE_ALERT, SHARE_LINK } from "../constants";
import { CollectionStoreState } from "../types";
import { CollectionAction } from "./CollectionAction";
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

export const initialState: CollectionStoreState = {
  items: [],
  openAlert: false,
  alertMessage: "",
  isLocked: false,
  name: "CollectionTest",
  createDate: "1-1-1990",
  users: ["testUser1", "testUser2"],
  collectionPrompt: false
};

export const collectionReducer = (
  state: CollectionStoreState = initialState,
  action: CollectionAction
) => {
  switch (action.type) {
    case NEW_COLLECTION_REQUEST:
      return state;
    case NEW_COLLECTION_SUCCESS:
      if (action.payload) {
        return {
          ...initialState,
          name: "",
          createDate: action.payload.createDate,
          users: []
        };
      }
    case NEW_COLLECTION_FAILURE:
      return state;

    case GET_COLLECTION_REQUEST:
      return state;
    case GET_COLLECTION_SUCCESS:
      if (action.payload) {
        const { items, createDate, name, isLocked } = action.payload;
        return { ...state, items, createDate, name, isLocked };
      }
      return state;
    case GET_COLLECTION_FAILURE:
      return state;

    case AUTH_COLLECTION_REQUEST:
      return state;
    case AUTH_COLLECTION_SUCCESS:
      return state;
    case AUTH_COLLECTION_FAILURE:
      return state;

    case LOCK_COLLECTION_REQUEST:
      return state;
    case LOCK_COLLECTION_SUCCESS:
      return { ...state, isLocked: action.payload };
    case LOCK_COLLECTION_FAILURE:
      return {
        ...state,
        openAlert: true,
        alertMessage: "Count not connect to DB"
      };

    case ADD_USER_TO_COLLECTION_REQUEST:
      return state;
    case ADD_USER_TO_COLLECTION_SUCCESS:
      if (action.payload && action.payload.accountName) {
        return {
          ...state,
          users: [...state.users, action.payload.accountName]
        };
      } else {
        return state;
      }
    case ADD_USER_TO_COLLECTION_FAILURE:
      return state;

    case REMOVE_USER_FROM_COLLECTION_FAILURE:
      return state;
    case REMOVE_USER_FROM_COLLECTION_REQUEST:
      return state;
    case REMOVE_USER_FROM_COLLECTION_SUCCESS:
      return state;

    case ADD_FILE_TO_COLLECTION_REQUEST:
      return state;
    case ADD_FILE_TO_COLLECTION_SUCCESS:
      if (action.payload && action.payload.newFileItem) {
        return {
          ...state,
          items: state.items
            ? [...state.items, action.payload.newFileItem]
            : [action.payload.newFileItem]
        };
      } else {
        return state;
      }
    case ADD_FILE_TO_COLLECTION_FAILURE:
      return state;

    case REMOVE_FILE_FROM_COLLECTION_REQUEST:
      return state;
    case REMOVE_FILE_FROM_COLLECTION_SUCCESS:
      if (action.payload && action.payload.fileId) {
        return {
          ...state,
          items:
            state.items &&
            state.items.filter(f => f.id !== action.payload!.fileId)
        };
      }
    case REMOVE_FILE_FROM_COLLECTION_FAILURE:
      return state;

    case CHANGE_COLLECTION_NAME_REQUEST:
      return state;
    case CHANGE_COLLECTION_NAME_SUCCESS:
      return { ...state, name: action.payload && action.payload.name };
    case CHANGE_COLLECTION_NAME_FAILURE:
      return {
        ...state,
        openAlert: true,
        alertMessage: "Could not connect to DB"
      };

    case SHARE_LINK:
      return { ...state, openAlert: true, alertMessage: "Copied to clipboard" };
    case CLOSE_ALERT:
      return { ...state, openAlert: false };

    default:
      return state;
  }
};
