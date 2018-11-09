import * as constants from "../constants";
import { collectionReducer } from "./CollectionReducer";

describe("CollectionReducer", () => {
  test("it should return initial state", () => {
    expect(collectionReducer(undefined, {} as any)).toMatchSnapshot();
  });

  describe("newCollection", () => {
    test("it should handle NEW_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, { type: constants.NEW_COLLECTION_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle NEW_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.NEW_COLLECTION_SUCCESS,
          payload: {
            createDate: "1-1-2001"
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle NEW_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, { type: constants.NEW_COLLECTION_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("getCollection", () => {
    test("it should handle GET_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, { type: constants.GET_COLLECTION_REQUEST })
      ).toMatchSnapshot();
    });

    test("it should handle GET_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.GET_COLLECTION_SUCCESS,
          payload: {
            success: true,
            items: [],
            createDate: "1-1-2001",
            name: "",
            isLocked: false,
            users: []
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle GET_COLLECTION_AUTH", () => {
      expect(
        collectionReducer(undefined, { type: constants.GET_COLLECTION_AUTH })
      ).toMatchSnapshot();
    });

    test("it should handle GET_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, { type: constants.GET_COLLECTION_FAILURE })
      ).toMatchSnapshot();
    });
  });

  describe("authCollection", () => {
    test("it should handle AUTH_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.AUTH_COLLECTION_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle AUTH_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.AUTH_COLLECTION_SUCCESS
        })
      ).toMatchSnapshot();
    });

    test("it should handle AUTH_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.AUTH_COLLECTION_FAILURE
        })
      ).toMatchSnapshot();
    });
  });
  describe("lockCollection", () => {
    test("it should handle LOCK_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.LOCK_COLLECTION_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle LOCK_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.LOCK_COLLECTION_SUCCESS
        })
      ).toMatchSnapshot();
    });

    test("it should handle LOCK_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.LOCK_COLLECTION_FAILURE
        })
      ).toMatchSnapshot();
    });
  });

  describe("addUserToCollection", () => {
    test("it should handle ADD_USER_TO_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.ADD_USER_TO_COLLECTION_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_USER_TO_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.ADD_USER_TO_COLLECTION_SUCCESS,
          payload: { success: true, accountName: "newAccount" }
        })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_USER_TO_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.ADD_USER_TO_COLLECTION_FAILURE
        })
      ).toMatchSnapshot();
    });
  });

  describe("removeUserFromCollection", () => {
    test("it should handle REMOVE_USER_FROM_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.REMOVE_USER_FROM_COLLECTION_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_USER_FROM_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.REMOVE_USER_FROM_COLLECTION_SUCCESS,
          payload: { accountName: "removedName", success: true }
        })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_USER_FROM_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.REMOVE_USER_FROM_COLLECTION_FAILURE
        })
      ).toMatchSnapshot();
    });
  });

  describe("addFileToCollection", () => {
    test("it should handle ADD_FILE_TO_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.ADD_FILE_TO_COLLECTION_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_FILE_TO_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.ADD_FILE_TO_COLLECTION_SUCCESS,
          payload: {
            success: true,
            newFileItem: { id: "1", name: "test", date: "1-1-2001", tags: [] }
          }
        })
      ).toMatchSnapshot();
    });

    test("it should handle ADD_FILE_TO_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.ADD_FILE_TO_COLLECTION_FAILURE
        })
      ).toMatchSnapshot();
    });
  });

  describe("removeFileFromCollection", () => {
    test("it should handle REMOVE_FILE_FROM_COLLECTION_REQUEST", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.REMOVE_FILE_FROM_COLLECTION_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_FILE_FROM_COLLECTION_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.REMOVE_FILE_FROM_COLLECTION_SUCCESS,
          payload: { success: true, fileId: "10" }
        })
      ).toMatchSnapshot();
    });

    test("it should handle REMOVE_FILE_FROM_COLLECTION_FAILURE", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.REMOVE_FILE_FROM_COLLECTION_FAILURE
        })
      ).toMatchSnapshot();
    });
  });

  describe("changeCollectionName", () => {
    test("it should handle CHANGE_COLLECTION_NAME_REQUEST", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.CHANGE_COLLECTION_NAME_REQUEST
        })
      ).toMatchSnapshot();
    });

    test("it should handle CHANGE_COLLECTION_NAME_SUCCESS", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.CHANGE_COLLECTION_NAME_SUCCESS,
          payload: { success: true, name: "newName" }
        })
      ).toMatchSnapshot();
    });

    test("it should handle CHANGE_COLLECTION_NAME_FAILURE", () => {
      expect(
        collectionReducer(undefined, {
          type: constants.CHANGE_COLLECTION_NAME_FAILURE
        })
      ).toMatchSnapshot();
    });
  });
});
