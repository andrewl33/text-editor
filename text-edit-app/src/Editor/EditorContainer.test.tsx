import * as React from 'react';
import { EditorContainer } from './EditorContainer';
import HeaderComponent from './HeaderComponent';
import EditorComponent from './EditorComponent';
import { shallow } from 'enzyme';
import { initialState } from './EditorReducer';

const dispatchProps = {
  onBatchUpdate: jest.fn(),
  onCodeChange: jest.fn(),
  onLock: jest.fn(),
  onMount: jest.fn(),
  onNew: jest.fn(),
  onShare: jest.fn()
}

const loadedState = {...initialState, isLoading: false};

const component = shallow(<EditorContainer {...initialState} {...dispatchProps}/>);
const componentLoaded = shallow(<EditorContainer {...loadedState} {...dispatchProps}/>);
describe('EditorContainer', () => {
  test('it renders null on startup', () => {
    expect(component.get(0)).toEqual(null);
  });

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

