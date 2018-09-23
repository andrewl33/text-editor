import * as actions from './EditorAction';
import * as constants from '../constants';
import { initialState } from './EditorReducer';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const initState = {
  editor: initialState,
  router: {
    action: "test",
    location: {
      hash: "test",
      pathname: "/test",
      search: "test"
    }
  }
}
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store: any;

const mockResponse = (status: any, statusText: any, response: any) => {

  return new (window as any).Response(response, {
    status, 
    statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
  
}

beforeEach(() => {
  store = mockStore(initState);
});



describe('EditorAction: updateCode', () => {
  it('updateCode calls request and success', () => {

    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockResponse(200, null, JSON.stringify({isSaved: true})))
    });

    return store.dispatch(actions.updateCode("test string"))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: constants.UPDATE_CODE_REQUEST});
        expect(expectedActions).toContainEqual({type: constants.UPDATE_CODE_SUCCESS, payload: "test string"});
      });
  });

  it('updateCode calls failure when not saved', () => {
    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockResponse(200, null, JSON.stringify({isSaved: false})))
    });

    return store.dispatch(actions.updateCode("test string"))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: constants.UPDATE_CODE_REQUEST});
        expect(expectedActions).toContainEqual({type: constants.UPDATE_CODE_FAILURE});
      });
  });
});

describe('EditorAction: getText', () => {
  it('getText calls request and success', () => {

    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockResponse(200, null, JSON.stringify({codeText: 'test string', success: true})))
    });

    return store.dispatch(actions.getText())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: constants.GET_TEXT_REQUEST});
        expect(expectedActions).toContainEqual({type: constants.GET_TEXT_SUCCESS, payload: "test string"});
      });
  });

  it('get text calls failure when not downloaded', () => {
    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockResponse(200, null, JSON.stringify({success: false})))
    });

    return store.dispatch(actions.getText())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: constants.GET_TEXT_REQUEST});
        expect(expectedActions).toContainEqual({type: constants.GET_TEXT_FAILURE});
      });
  });
});

describe('EditorAction: newText', () => {
  it('newText calls request and success', () => {

    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockResponse(200, null, JSON.stringify({success: true, url: '/test'})))
    });

    return store.dispatch(actions.newText())
      .then(() => {
        const expectedActions = store.getActions();
        
        // push is also dispatched for connected-react-router
        expect(expectedActions.length).toBe(3);
        expect(expectedActions).toContainEqual({type: constants.NEW_TEXT_REQUEST});
        expect(expectedActions).toContainEqual({type: constants.NEW_TEXT_SUCCESS});
      });
  });

  it('new text calls failure when url not created', () => {
    (window as any).fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve(mockResponse(200, null, JSON.stringify({success: false})))
    });

    return store.dispatch(actions.newText())
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual({type: constants.NEW_TEXT_REQUEST});
        expect(expectedActions).toContainEqual({type: constants.NEW_TEXT_FAILURE});
      });
  });
});

describe('EditorAction: non-async', () => {
  it('closes alert', () => {
    store.dispatch(actions.closeAlert());
    expect(store.getActions().length).toBe(1);
    expect(store.getActions()).toContainEqual({type: constants.CLOSE_ALERT});
  });
});