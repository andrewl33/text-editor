import { CLOSE_ALERT, SHARE_LINK } from "../constants";
import { CollectionStoreState } from "../types";
import { CollectionAction } from "./CollectionAction";
import {
  ADD_FILE_FAILURE,
  ADD_FILE_REQUEST,
  ADD_FILE_SUCCESS,
  AUTH_COLLECTION_FAILURE,
  AUTH_COLLECTION_REQUEST,
  AUTH_COLLECTION_SUCCESS,
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

export const initialState: CollectionStoreState = {
  items: null,
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
      return { ...state };
    case NEW_COLLECTION_SUCCESS:
      return { ...state };
    case NEW_COLLECTION_FAILURE:
      return { ...state };

    case GET_COLLECTION_REQUEST:
      return { ...state };
    case GET_COLLECTION_SUCCESS:
      return { ...state, items: action.payload && action.payload.items };
    case GET_COLLECTION_FAILURE:
      return { ...state };

    case AUTH_COLLECTION_REQUEST:
      return { ...state };
    case AUTH_COLLECTION_SUCCESS:
      return { ...state };
    case AUTH_COLLECTION_FAILURE:
      return { ...state };

    case LOCK_COLLECTION_REQUEST:
      return { ...state };
    case LOCK_COLLECTION_SUCCESS:
      return { ...state, isLocked: action.payload };
    case LOCK_COLLECTION_FAILURE:
      return { ...state };

    case ADD_FILE_REQUEST:
    case ADD_FILE_SUCCESS:
    case ADD_FILE_FAILURE:

    case REMOVE_FILE_REQUEST:
    case REMOVE_FILE_SUCCESS:
    case REMOVE_FILE_FAILURE:

    case SHARE_LINK:
      return { ...state, openAlert: true, alertMessage: "Copied to clipboard" };
    case CLOSE_ALERT:
      return { ...state, openAlert: false };

    default:
      return state;
  }
};
