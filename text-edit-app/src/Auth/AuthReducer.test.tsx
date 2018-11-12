import * as constants from "../constants";
import { authReducer } from "./AuthReducer";

describe("AuthReducer", () => {
  test("it should return initial state", () => {
    expect(authReducer(undefined, {} as any)).toMatchSnapshot();
  });

  test("it should handle UPDATE_TOKEN", () => {
    expect(
      authReducer(undefined, {
        type: constants.UPDATE_TOKEN,
        payload: { success: true, token: "Bearer FakeTokenToken" }
      })
    ).toMatchSnapshot();
  });

  describe("createAccount", () => {
    test("it should handle CREATE_ACCOUNT_REQUEST", () => {
      expect(
        authReducer(undefined, { type: constants.CREATE_ACCOUNT_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle CREATE_ACCOUNT_SUCCESS", () => {
      expect(
        authReducer(undefined, {
          type: constants.CREATE_ACCOUNT_SUCCESS,
          payload: { accountName: "testName", success: true }
        })
      ).toMatchSnapshot();
    });

    test("it should handle CREATE_ACCOUNT_FAILURE", () => {
      expect(
        authReducer(undefined, { type: constants.CREATE_ACCOUNT_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("logIn", () => {
    test("it should handle LOG_IN_REQUEST", () => {
      expect(
        authReducer(undefined, { type: constants.LOG_IN_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle LOG_IN_SUCCESS", () => {
      expect(
        authReducer(undefined, {
          type: constants.LOG_IN_SUCCESS,
          payload: { accountName: "testName", success: true }
        })
      ).toMatchSnapshot();
    });

    test("it should handle LOG_IN_FAILURE", () => {
      expect(
        authReducer(undefined, { type: constants.LOG_IN_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("getDashboard", () => {
    test("it should handle GET_DASHBOARD_REQUEST", () => {
      expect(
        authReducer(undefined, { type: constants.GET_DASHBOARD_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle GET_DASHBOARD_SUCCESS", () => {
      expect(
        authReducer(undefined, {
          type: constants.GET_DASHBOARD_SUCCESS,
          payload: { dashboard: { collections: [], files: [] }, success: true }
        })
      ).toMatchSnapshot();
    });

    test("it should handle GET_DASHBOARD_FAILURE", () => {
      expect(
        authReducer(undefined, { type: constants.GET_DASHBOARD_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("logOut", () => {
    test("it should handle LOG_OUT_REQUEST", () => {
      expect(
        authReducer(undefined, { type: constants.LOG_OUT_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle LOG_OUT_SUCCESS", () => {
      expect(
        authReducer(undefined, {
          type: constants.LOG_OUT_SUCCESS
        })
      ).toMatchSnapshot();
    });

    test("it should handle LOG_OUT_FAILURE", () => {
      expect(
        authReducer(undefined, { type: constants.LOG_OUT_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("authPrompt", () => {
    test("it should handle LOG_IN_PROMPT", () => {
      expect(
        authReducer(undefined, { type: constants.LOG_IN_PROMPT })
      ).toMatchSnapshot();
    });

    test("it should handle CLOSE_PROMPT", () => {
      expect(
        authReducer(undefined, {
          type: constants.CLOSE_PROMPT
        })
      ).toMatchSnapshot();
    });
  });
});
