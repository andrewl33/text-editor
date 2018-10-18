import * as React from 'react';
import { EditorContainer } from './EditorContainer';
import { HeaderComponent } from '../generic/TopBar/HeaderComponent';
import EditorComponent from './EditorComponent';
import { shallow } from 'enzyme';
import { initialState as editorStoreState } from './EditorReducer';

export const dispatchProps = {
  onBatchUpdate: jest.fn(),
  onCodeChange: jest.fn(),
  onAlert: jest.fn(),
  onLock: jest.fn(),
  onMount: jest.fn(),
  onNew: jest.fn(),
  onShare: jest.fn(),
  onAuthAccount: jest.fn(),
  onAuthFile: jest.fn()
}

export const initState = {...editorStoreState, pathname: 'test.com/test', authPrompt: false}
const loadedState = {...initState, isLoading: false};

const componentLoaded = shallow(<EditorContainer {...loadedState} {...dispatchProps} accountName={"wow"} loggedIn={true}/>);
describe('EditorContainer', () => {

  test('onMount called on mount', () => {
    expect(dispatchProps.onMount).toBeCalled();
  });

  test('Header Component loaded', () => {
    expect(componentLoaded.find(HeaderComponent).length).toEqual(1);
  });

  test('Editor Component loaded', () => {
    expect(componentLoaded.find(EditorComponent).length).toEqual(1);
  })
});

