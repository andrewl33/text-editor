import * as constants from "../constants";
import { editorReducer, initialState } from "./EditorReducer";

describe("EditorReducer", () => {
  test("it should return initial state", () => {
    expect(editorReducer(undefined, {} as any)).toMatchSnapshot();
  });

  describe("updateCode", () => {
    test("it should handle UPDATE_CODE_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.UPDATE_CODE_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle UPDATE_CODE_SUCCESS", () => {
      expect(
        editorReducer(undefined, { type: constants.UPDATE_CODE_SUCCESS })
      ).toMatchSnapshot();
    });

    test("it should handle UPDATE_CODE_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.UPDATE_CODE_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("get text", () => {
    test("it should handle GET_TEXT_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.GET_TEXT_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle GET_TEXT_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
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
        })
      ).toMatchSnapshot();
    });

    test("it should handle GET_TEXT_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.GET_TEXT_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("lock text", () => {
    test("it should handle LOCK_TEXT_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.LOCK_TEXT_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle LOCK_TEXT_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
          type: constants.LOCK_TEXT_SUCCESS,
          payload: {
            success: true,
            message: "Authenticated"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle LOCK_TEXT_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.LOCK_TEXT_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("add tag", () => {
    test("it should handle ADD_TAG_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.ADD_TAG_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_TAG_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
          type: constants.ADD_TAG_SUCCESS,
          payload: {
            success: true,
            name: "newTag"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_TAG_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.ADD_TAG_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("remove tag", () => {
    test("it should handle REMOVE_TAG_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.REMOVE_TAG_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_TAG_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
          type: constants.REMOVE_TAG_SUCCESS,
          payload: {
            success: true,
            name: "tag"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_TAG_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.REMOVE_TAG_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("new text", () => {
    const request = { ...initialState, isNewPage: true };
    const success = {
      ...initialState,
      isNewPage: true,
      openAlert: true,
      alertMessage: "Created a new page"
    };
    const failure = {
      ...initialState,
      isNewPage: false,
      openAlert: true,
      alertMessage: "Failed to create new page, try again"
    };

    test("it should handle NEW_TEXT_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.NEW_TEXT_REQUEST })
      ).toEqual(request);
    });

    test("it should handle NEW_TEXT_SUCCESS", () => {
      expect(
        editorReducer(undefined, { type: constants.NEW_TEXT_SUCCESS })
      ).toEqual(success);
    });

    test("it should handle NEW_TEXT_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.NEW_TEXT_FAILURE })
      ).toEqual(failure);
    });
  });

  describe("auth file", () => {
    test("it should handle AUTH_FILE_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.AUTH_FILE_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle AUTH_FILE_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
          type: constants.AUTH_FILE_SUCCESS,
          payload: {
            success: true,
            message: "Authenticated"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle AUTH_FILE_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.AUTH_FILE_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("change file name", () => {
    test("it should handle CHANGE_FILE_NAME_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.CHANGE_FILE_NAME_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle CHANGE_FILE_NAME_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
          type: constants.CHANGE_FILE_NAME_SUCCESS,
          payload: {
            success: true,
            name: "newName"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle CHANGE_FILE_NAME_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.CHANGE_FILE_NAME_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("add user to file", () => {
    test("it should handle ADD_USER_TO_FILE_REQUEST", () => {
      expect(
        editorReducer(undefined, { type: constants.ADD_USER_TO_FILE_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_USER_TO_FILE_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
          type: constants.ADD_USER_TO_FILE_SUCCESS,
          payload: {
            success: true,
            accountName: "newName"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_USER_TO_FILE_FAILURE", () => {
      expect(
        editorReducer(undefined, { type: constants.ADD_USER_TO_FILE_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("remove user from file", () => {
    test("it should handle REMOVE_USER_FROM_FILE_REQUEST", () => {
      expect(
        editorReducer(undefined, {
          type: constants.REMOVE_USER_FROM_FILE_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_USER_FROM_FILE_SUCCESS", () => {
      expect(
        editorReducer(undefined, {
          type: constants.REMOVE_USER_FROM_FILE_SUCCESS,
          payload: {
            success: true,
            accountName: "newName"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_USER_FROM_FILE_FAILURE", () => {
      expect(
        editorReducer(undefined, {
          type: constants.REMOVE_USER_FROM_FILE_FAILURE
        })
      ).toMatchSnapshot();
    });
  });

  // type changed code, lock text, and share link
  describe("EditorReducer: local actions", () => {
    test("it should handle CLOSE_ALERT", () => {
      expect(editorReducer(undefined, { type: constants.CLOSE_ALERT })).toEqual(
        {
          ...initialState,
          openAlert: false
        }
      );
    });
  });
});
