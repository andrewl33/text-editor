import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as constants from "../constants";
import * as actions from "./AuthAction";
import { initialState } from "./AuthReducer";

const initState = {
  router: {
    action: "test",
    location: {
      hash: "test",
      pathname: "/test",
      search: "test"
    }
  },
  authentication: initialState
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
    headers.set("Authorization", "Bearer testToken");
  }

  return new (window as any).Response(response, {
    status,
    statusText,
    headers
  });
};

describe("AuthAction", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  describe("createAccount", () => {
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
        .dispatch(actions.createAccount("accountName", "password"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.CREATE_ACCOUNT_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.CREATE_ACCOUNT_SUCCESS,
            payload: { success: true, accountName: "accountName" }
          });
        });
    });

    it("dispatches failure when new account fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store
        .dispatch(actions.createAccount("accountName", "password"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.CREATE_ACCOUNT_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.CREATE_ACCOUNT_FAILURE
          });
        });
    });
  });

  describe("getDashboard", () => {
    it("dispatches request and success", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(
            200,
            null,
            JSON.stringify({
              success: true,
              dashboard: {
                collections: [
                  {
                    createDate: "1-1-2001",
                    id: "1",
                    name: "",
                    users: []
                  }
                ],
                files: [
                  {
                    createDate: "1-1-2001",
                    id: "1",
                    name: "",
                    users: [],
                    tags: []
                  }
                ]
              }
            })
          )
        );
      });

      return store.dispatch(actions.getDashboard()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.GET_DASHBOARD_REQUEST
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_DASHBOARD_SUCCESS,
          payload: {
            success: true,
            dashboard: {
              collections: [
                {
                  date: "1-1-2001",
                  id: "1",
                  name: "",
                  users: []
                }
              ],
              files: [
                {
                  date: "1-1-2001",
                  id: "1",
                  name: "",
                  users: [],
                  tags: []
                }
              ]
            }
          }
        });
      });
    });

    it("dispatches failure when get dashboard fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store.dispatch(actions.getDashboard()).then(() => {
        const receivedActions = store.getActions();
        expect(receivedActions.length).toBe(2);
        expect(receivedActions).toContainEqual({
          type: constants.GET_DASHBOARD_FAILURE
        });
        expect(receivedActions).toContainEqual({
          type: constants.GET_DASHBOARD_REQUEST
        });
      });
    });
  });

  describe("logIn", () => {
    it("dispatches request and success", () => {
      let firstFetch = true;

      (window as any).fetch = jest.fn().mockImplementation(() => {
        if (firstFetch) {
          firstFetch = !firstFetch;

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
                dashboard: {
                  collections: [
                    {
                      createDate: "1-1-2001",
                      id: "1",
                      name: "",
                      users: []
                    }
                  ],
                  files: [
                    {
                      createDate: "1-1-2001",
                      id: "1",
                      name: "",
                      users: [],
                      tags: []
                    }
                  ]
                }
              })
            )
          );
        }
      });

      return store
        .dispatch(actions.logIn("accountName", "password"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(3);
          expect(receivedActions).toContainEqual({
            type: constants.LOG_IN_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.LOG_IN_SUCCESS,
            payload: { success: true, accountName: "accountName" }
          });
          expect(receivedActions).toContainEqual({
            type: constants.GET_DASHBOARD_REQUEST
          });
        });
    });

    it("dispatches failure when login fails", () => {
      (window as any).fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve(
          mockResponse(200, null, JSON.stringify({ success: false }))
        );
      });

      return store
        .dispatch(actions.logIn("accountName", "password"))
        .then(() => {
          const receivedActions = store.getActions();
          expect(receivedActions.length).toBe(2);
          expect(receivedActions).toContainEqual({
            type: constants.LOG_IN_REQUEST
          });
          expect(receivedActions).toContainEqual({
            type: constants.LOG_IN_FAILURE
          });
        });
    });
  });

  describe("non async actions", () => {
    it("logInPrompt", () => {
      expect(actions.logInPrompt()).toEqual({ type: constants.LOG_IN_PROMPT });
    });

    it("updateToken", () => {
      expect(actions.updateToken("Bearer newToken")).toEqual({
        type: constants.UPDATE_TOKEN,
        payload: {
          success: true,
          token: "Bearer newToken"
        }
      });
    });

    it("logOut", () => {
      expect(actions.logOut()).toEqual({
        type: constants.LOG_OUT_SUCCESS
      });
    });
  });
});
