import * as React from 'react';
import { HeaderComponent } from './HeaderComponent';
import {initState as editorProps, dispatchProps} from '../../Editor/EditorContainer.test';
import { mount } from 'enzyme';
import { Button } from 'semantic-ui-react';

// https://github.com/mattermost/mattermost-webapp/pull/228
// handles document.execCommand for copy
const supportedCommands = ['copy'];

Object.defineProperty(document, 'queryCommandSupported', {
  value: (cmd: any) => (supportedCommands as any).includes(cmd)
});

Object.defineProperty(document, 'execCommand', {
  value: (cmd: any) => (supportedCommands as any).includes(cmd)
});

const mockButtonFunction = jest.fn();
const wrapper = mount(
  <HeaderComponent 
    {...editorProps}
    {...dispatchProps}
    onNew={mockButtonFunction}
    onLock={mockButtonFunction}
    onShare={mockButtonFunction}
    accountName={"account name"}
    loggedIn={true} 
    pageName={"Collection"} 
  />
);

describe('HeaderComponent', () => {
  test('it renders buttons', () => {
    expect(wrapper.find(Button).length).toEqual(3);
  });
  
  test('it fires passed down functions on click', () => {
    const buttons = wrapper.find(Button);
  
    buttons.forEach((button) => {
      button.simulate('click');
    });
  
    expect(mockButtonFunction.mock.calls.length).toBe(3);
  });

  test('true copy state deletes a textarea', () => {
    wrapper.setState({copy: true});
    expect(wrapper.find(<textarea/>).length).toEqual(0);
  });

  test('true copy state deletes a textarea', () => {
    // tslint:disable-next-line
    console.log(wrapper);
    wrapper.setState({copy: false});
    expect(wrapper.find(<textarea/>).length).toEqual(0);
  });
});
