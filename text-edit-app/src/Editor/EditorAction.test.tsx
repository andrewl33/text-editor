import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as constants from "../constants";
import * as actions from "./EditorAction";
import { initialState } from "./EditorReducer";

const initState = {
  editor: initialState,
  router: {
    action: "test",
    location: {
      hash: "test",
      pathname: "/test",
      search: "test"
    }
  },
  authentication: {
    token: undefined
  }
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store: any;

const mockResponse = (status: any, statusText: any, response: any) => {
  return new (window as any).Response(response, {
    status,
    statusText,
    headers: {
      "Content-type": "application/json"
    }
  });
};

describe("EditorAction", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  describe("updateCode", () => {
    it("localUpdateCode should update code", () => {
      const codeText = "test1";
      const expectedAction = {
        type: constants.LOCAL_UPDATE_CODE,
        payload: {
          codeText
        }
      };

      expect(actions.localUpdateCode(codeText)).toEqual(expectedAction);
    });

    it("updateCode calls request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ isSaved: true }))
        );
      });

      return store.dispatch(actions.updateCode()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.UPDATE_CODE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.UPDATE_CODE_SUCCESS,
          payload: { success: true }
        });
      });
    });

    it("updateCode calls failure when not saved", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ isSaved: false }))
        );
      });

      return store.dispatch(actions.updateCode()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.UPDATE_CODE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.UPDATE_CODE_FAILURE
        });
      });
    });
  });

  describe("getText", () => {
    it("returns request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              codeText: "test string",
              success: true,
              tags: [],
              name: "",
              createDate: "1-1-2001",
              isPrivate: false,
              users: []
            })
          )
        );
      });

      return store.dispatch(actions.getText()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.GET_TEXT_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_TEXT_SUCCESS,
          payload: {
            success: true,
            body: {
              codeText: "test string",
              tags: [],
              name: "",
              createDate: "1-1-2001",
              isLocked: false,
              users: []
            }
          }
        });
      });
    });

    it("returns failure when not downloaded", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.getText()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.GET_TEXT_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_TEXT_FAILURE
        });
      });
    });
  });

  describe("lockText", () => {
    it("returns request and success", () => {
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

      return store.dispatch(actions.lockText("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_TEXT_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_TEXT_SUCCESS,
          payload: {
            success: true,
            message: "Authenticated"
          }
        });
      });
    });

    it("returns failure when not authenticated", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.lockText("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_TEXT_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.LOCK_TEXT_FAILURE,
          payload: {
            success: false,
            message: "Wrong password"
          }
        });
      });
    });
  });

  describe("addTag", () => {
    it("returns request and success", () => {
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

      return store.dispatch(actions.addTag("newTag")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_TAG_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_TAG_SUCCESS,
          payload: {
            success: true,
            name: "newTag"
          }
        });
      });
    });

    it("returns failure when addTag fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.addTag("newTag")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_TAG_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_TAG_FAILURE
        });
      });
    });
  });

  describe("removeTag", () => {
    it("returns request and success", () => {
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

      return store.dispatch(actions.removeTag("tag")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_TAG_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_TAG_SUCCESS,
          payload: {
            success: true,
            name: "tag"
          }
        });
      });
    });

    it("returns failure when removeTag fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.removeTag("newTag")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_TAG_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_TAG_FAILURE
        });
      });
    });
  });

  describe("newText", () => {
    it("returns request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({ success: true, url: "/test" })
          )
        );
      });

      return store.dispatch(actions.newText()).then(() => {
        const expectedActions = store.getActions();

        // push is also dispatched for connected-react-router
        expect(expectedActions.length).toBe(3);
        expect(expectedActions).toContainEqual({
          type: constants.NEW_TEXT_REQUEST
        });
        expect(expectedActions).toContainEqual({
          type: constants.NEW_TEXT_SUCCESS
        });
      });
    });

    it("returns failure when url not created", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.newText()).then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({
          type: constants.NEW_TEXT_REQUEST
        });
        expect(expectedActions).toContainEqual({
          type: constants.NEW_TEXT_FAILURE
        });
      });
    });
  });

  describe("authFile", () => {
    it("returns request and success", () => {
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

      return store.dispatch(actions.authFile("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(3);
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_FILE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_FILE_SUCCESS,
          payload: {
            success: true,
            message: "Authenticated"
          }
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_TEXT_REQUEST
        });
      });
    });

    it("returns failure when authFile fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.authFile("password")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_FILE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.AUTH_FILE_FAILURE
        });
      });
    });
  });

  describe("changeFileName", () => {
    it("returns request and success", () => {
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

      return store.dispatch(actions.changeFileName("newName")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.CHANGE_FILE_NAME_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.CHANGE_FILE_NAME_SUCCESS,
          payload: {
            success: true,
            name: "newName"
          }
        });
      });
    });

    it("returns failure when changeFileName fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.changeFileName("newName")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.CHANGE_FILE_NAME_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.CHANGE_FILE_NAME_FAILURE
        });
      });
    });
  });

  describe("addUserToFile", () => {
    it("returns request and success", () => {
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

      return store.dispatch(actions.addUserToFile("newName")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_FILE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_FILE_SUCCESS,
          payload: {
            success: true,
            accountName: "newName"
          }
        });
      });
    });

    it("returns failure when user add fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.addUserToFile("newName")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_FILE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.ADD_USER_TO_FILE_FAILURE
        });
      });
    });
  });

  describe("removeUserFromFile", () => {
    it("returns request and success", () => {
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

      return store.dispatch(actions.removeUserFromFile("newName")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_USER_FROM_FILE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_USER_FROM_FILE_SUCCESS,
          payload: {
            success: true,
            accountName: "newName"
          }
        });
      });
    });

    it("returns failure when user remove fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.removeUserFromFile("newName")).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_USER_FROM_FILE_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.REMOVE_USER_FROM_FILE_FAILURE
        });
      });
    });
  });

  // TODO: remove to another reducer
  describe("non-async", () => {
    it("closes alert", () => {
      store.dispatch(actions.closeAlert());
      expect(store.getActions().length).toBe(1);
      expect(store.getActions()).toContainEqual({
        type: constants.CLOSE_ALERT
      });
    });

    it("shares link", () => {
      store.dispatch(actions.shareLink());
      expect(store.getActions().length).toBe(1);
      expect(store.getActions()).toContainEqual({ type: constants.SHARE_LINK });
    });
  });
});
