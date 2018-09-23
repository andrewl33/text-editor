import * as React from 'react';
import EditorComponent from './EditorComponent';
import { mount } from 'enzyme';
import ContentEditable from 'react-sane-contenteditable';

const mockBatchUpdate = jest.fn();
const props = {
  codeText: "var wow", 
  isLoading: true,
  isNewPage: false,
  hasAuth: false,
  isLocked: false,
  isSaved: true,
  onBatchUpdate: mockBatchUpdate,
  openAlert: false,
  alertMessage: '',
  pathname: 'test',
  onCodeChange: () => {/**/},
  onAlert: () => {/**/},
  onLock: () => {/**/},
  onMount: () => {/**/},
  onNew: () => {/**/},
  onShare: () => {/**/}
}

const wrapper = mount(
  <EditorComponent {...props}/>
);

const contentEditable = wrapper.find(ContentEditable);

describe('EditorComponent', () => {
  test('it renders ContentEditable', () => {
    expect(contentEditable.length).toEqual(1);
  });

  test('it does not call mockFunction before 2.5 seconds', () => {
    contentEditable.simulate('change');
    expect(mockBatchUpdate).not.toBeCalled();
  });

  test('it does call mockFunction after 2.5 seconds', () => {
    contentEditable.simulate('change');
    setTimeout(() => {
      expect(mockBatchUpdate.mock.calls.length).toEqual(2);
    }, 2600);
  });
  
  test('delay resets the timer whenever another change is called', () => {
    for (let i = 0; i < 10; i++) {
      contentEditable.simulate('change');
    }
    
    expect(mockBatchUpdate.mock.calls.length).toBeLessThan(4);
  });

});