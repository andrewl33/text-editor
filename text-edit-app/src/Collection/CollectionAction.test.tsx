import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as constants from "../constants";
import * as actions from "./CollectionAction";
import { initialState } from "./CollectionReducer";

const initState = {
  collection: initialState,
  router: {
    action: "test",
    location: {
      hash: "test",
      pathname: "/test",
      search: "test"
    }
  },
  authentication: {
    token: "Bearer Wow"
  }
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store: any;

const mockResponse = (
  status: any,
  statusText: any,
  response: any,
  isAuth?: any
) => {
  const headers = new Headers();
  headers.set("Content-type", "application/json");
  if (isAuth) {
    headers.set("Authorization", "Bearer wow");
  }

  return new (window as any).Response(response, {
    status,
    statusText,
    headers
  });
};

describe("CollectionAction", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  describe("newCollection", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true,
              createDate: "1-1-2001",
              url: "test"
            })
          )
        );
      });

      return store.dispatch(actions.newCollection()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(3);
        expect(receivedActions).toContainEqual({
          type: constants.NEW_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.NEW_COLLECTION_SUCCESS,
          payload: { success: true, createDate: "1-1-2001" }
        });
        expect(receivedActions).toContainEqual({
          payload: { args: ["/collections/test"], method: "push" },
          type: "@@router/CALL_HISTORY_METHOD"
        });
      });
    });

    it("dispatches failure when new collection fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.newCollection()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.NEW_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.NEW_COLLECTION_FAILURE
        });
      });
    });
  });

  // get collection
  describe("getCollectionFiles", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true,
              fileInfo: [],
              collectionInfo: {
                name: "wow",
                createDate: "1-1-2001",
                isPrivate: false,
                users: []
              }
            })
          )
        );
      });

      return store.dispatch(actions.getCollectionFiles()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.GET_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_COLLECTION_SUCCESS,
          payload: {
            success: true,
            items: [],
            name: "wow",
            createDate: "1-1-2001",
            isLocked: false,
            users: []
          }
        });
      });
    });

    it("dispatches failure when user add fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.getCollectionFiles()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.GET_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_COLLECTION_FAILURE
        });
      });
    });

    it("dispatches authentication when locked", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ password: true }))
        );
      });

      return store.dispatch(actions.getCollectionFiles()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.GET_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_COLLECTION_AUTH
        });
      });
    });
  });

  // add file
  describe("addFileToCollection", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true,
              newFileItem: {
                name: "newFile",
                id: "1",
                date: "1-1-2001",
                tags: []
              }
            })
          )
        );
      });

      return store.dispatch(actions.addFileToCollection("newFile")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_FILE_TO_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_FILE_TO_COLLECTION_SUCCESS,
          payload: {
            success: true,
            newFileItem: {
              date: "1-1-2001",
              tags: undefined,
              id: "1",
              name: "newFile"
            }
          }
        });
      });
    });

    it("dispatches failure when file add fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.addFileToCollection("newName")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_FILE_TO_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_FILE_TO_COLLECTION_FAILURE
        });
      });
    });
  });

  // remove file
  describe("removeFileFromCollection", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true
            })
          )
        );
      });

      return store
        .dispatch(actions.removeFileFromCollection("newFile"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_FILE_FROM_COLLECTION_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_FILE_FROM_COLLECTION_SUCCESS,
            payload: {
              success: true,
              fileId: "newFile"
            }
          });
        });
    });

    it("dispatches failure when file remove fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store
        .dispatch(actions.removeFileFromCollection("newName"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_FILE_FROM_COLLECTION_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_FILE_FROM_COLLECTION_FAILURE
          });
        });
    });
  });

  // lock collection
  describe("lockCollection", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true
            })
          )
        );
      });

      return store.dispatch(actions.lockCollection("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_COLLECTION_SUCCESS,
          payload: true
        });
      });
    });
    it("dispatches failure when lock collection fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.lockCollection("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_COLLECTION_FAILURE
        });
      });
    });
  });

  // auth collection
  describe("authCollection", () => {
    it("dispatches request and success", () => {
      let fetchNum = 0;

      (window as any).fetch = jest.fn().mockImplementation(() => {
        if (fetchNum < 1) {
          fetchNum++;
          return Promise.resolve(
            mockResponse(
              200,
              null,
              JSON.stringify({
                success: true
              })
            )
          );
        } else {
          return Promise.resolve(
            mockResponse(
              200,
              null,
              JSON.stringify({
                success: true,
                fileInfo: [],
                collectionInfo: {
                  name: "wow",
                  createDate: "1-1-2001",
                  isPrivate: false,
                  users: []
                }
              }),
              true
            )
          );
        }
      });

      return store.dispatch(actions.authCollection("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(3);
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_COLLECTION_SUCCESS,
          payload: { success: true }
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_COLLECTION_REQUEST
        });
      });
    });
    it("dispatches failure when auth collection fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.authCollection("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_COLLECTION_FAILURE
        });
      });
    });
  });

  // change collection name
  describe("changeCollectionName", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true
            })
          )
        );
      });

      return store
        .dispatch(actions.changeCollectionName("newName"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.CHANGE_COLLECTION_NAME_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.CHANGE_COLLECTION_NAME_SUCCESS,
            payload: { success: true, name: "newName" }
          });
        });
    });
    it("dispatches failure when new name fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store
        .dispatch(actions.changeCollectionName("newName"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.CHANGE_COLLECTION_NAME_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.CHANGE_COLLECTION_NAME_FAILURE
          });
        });
    });
  });

  // add user to collection
  describe("addUserToCollection", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true
            })
          )
        );
      });

      return store.dispatch(actions.addUserToCollection("newUser")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_COLLECTION_SUCCESS,
          payload: { success: true, accountName: "newUser" }
        });
      });
    });
    it("dispatches failure when add new user fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.addUserToCollection("newUser")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_COLLECTION_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_COLLECTION_FAILURE
        });
      });
    });
  });

  // remove user from collection
  describe("removeUserFromCollection", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true
            })
          )
        );
      });

      return store
        .dispatch(actions.removeUserFromCollection("newUser"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_USER_FROM_COLLECTION_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_USER_FROM_COLLECTION_SUCCESS,
            payload: { success: true, accountName: "newUser" }
          });
        });
    });
    it("dispatches failure when remove user fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store
        .dispatch(actions.removeUserFromCollection("newUser"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_USER_FROM_COLLECTION_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.REMOVE_USER_FROM_COLLECTION_FAILURE
          });
        });
    });
  });

  // TODO: maybe alert/close alert
});
