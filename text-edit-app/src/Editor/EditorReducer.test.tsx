import { editorReducer, initialState } from './EditorReducer';
import { 
  UPDATE_CODE_REQUEST, UPDATE_CODE_SUCCESS, UPDATE_CODE_FAILURE,
  GET_TEXT_REQUEST, GET_TEXT_SUCCESS, GET_TEXT_FAILURE, 
  NEW_TEXT_REQUEST, NEW_TEXT_SUCCESS, NEW_TEXT_FAILURE, CLOSE_ALERT
} from '../constants';


test('it should return inital state', () => {
  expect(editorReducer(undefined, {} as any)).toEqual(initialState);
});

describe('update code', () => {

  const updatedCodeRequest = {...initialState, isLoading: true};
  const updatedCodeSuccess = {...initialState, isLoading: false, isSaved: true, openAlert: true, alertMessage: 'Updated code'};
  const updatedCodeFailure = {...initialState, isLoading: false, isSaved: false, openAlert: true, alertMessage: 'Failed to update code'};

  test('it should handle UPDATE_CODE_REQUEST', () => {
    expect(editorReducer(undefined, {type: UPDATE_CODE_REQUEST}))
      .toEqual(updatedCodeRequest);
  });

  test('it should handle UPDATE_CODE_SUCCESS', () => {
    expect(editorReducer(undefined, {type: UPDATE_CODE_SUCCESS}))
      .toEqual(updatedCodeSuccess);
  });

  test('it should handle UPDATE_CODE_FAILURE', () => {
    expect(editorReducer(undefined, {type: UPDATE_CODE_FAILURE}))
      .toEqual(updatedCodeFailure);
  });
});

describe('get text', () => {

  const textString = 'Ncu06QeyNlNk8q2St5KvNOjtDHmOC9sU5yILgjS1X7bs6H';
  const request = {...initialState, isLoading: true, openAlert: true, alertMessage: 'Loading code...'};
  const success = {...initialState, isLoading: false, isSaved: true, codeText: textString};
  const failure = {...initialState, isLoading: false, isSaved: false, openAlert: true, alertMessage: 'Failed to load saved code'};

  test('it should handle GET_TEXT_REQUEST', () => {
    expect(editorReducer(undefined, {type: GET_TEXT_REQUEST}))
      .toEqual(request);
  });

  test('it should handle GET_TEXT_SUCCESS', () => {
    expect(editorReducer(undefined, {type: GET_TEXT_SUCCESS, payload: textString}))
      .toEqual(success);
  });

  test('it should handle GET_TEXT_FAILURE', () => {
    expect(editorReducer(undefined, {type: GET_TEXT_FAILURE}))
      .toEqual(failure);
  });

});

describe('new text', () => {

  const request = {...initialState, isLoading: true, isNewPage: true};
  const success = {...initialState, isLoading: false, isNewPage: true, openAlert: true, alertMessage: 'Created a new page'};
  const failure = {...initialState, isNewPage: false, isLoading: false, openAlert: true, alertMessage: 'Failed to create new page, try again'};

  test('it should handle NEW_TEXT_REQUEST', () => {
    expect(editorReducer(undefined, {type: NEW_TEXT_REQUEST}))
      .toEqual(request);
  });

  test('it should handle NEW_TEXT_SUCCESS', () => {
    expect(editorReducer(undefined, {type: NEW_TEXT_SUCCESS}))
      .toEqual(success);
  });

  test('it should handle NEW_TEXT_FAILURE', () => {
    expect(editorReducer(undefined, {type: NEW_TEXT_FAILURE}))
      .toEqual(failure);
  });

});

// type changed code, lock text, and share link
describe('EditorReducer: local actions', () => {
  test('it should handle CLOSE_ALERT', () => {
    expect(editorReducer(undefined, {type: CLOSE_ALERT})).toEqual({...initialState, openAlert: false});
  })
});