import * as React from 'react';
import HeaderComponent from './HeaderComponent';
import { mount } from 'enzyme';
import { Button } from 'semantic-ui-react';

const mockButtonFunction = jest.fn();
const wrapper = mount(
  <HeaderComponent 
    onNew={mockButtonFunction}
    onLock={mockButtonFunction}
    onShare={mockButtonFunction}  
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
});
