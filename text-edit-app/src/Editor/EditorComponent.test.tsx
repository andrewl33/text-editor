import { mount } from "enzyme";
import * as React from "react";
import ContentEditable from "react-sane-contenteditable";
import * as renderer from "react-test-renderer";
import EditorComponent from "./EditorComponent";

const mockBatchUpdate = jest.fn();
const props = {
  onLocalUpdate: jest.fn(),
  onBatchUpdate: jest.fn(),
  onCodeChange: jest.fn(),
  onRemoveTag: jest.fn(),
  onAddTag: jest.fn(),
  onAddUser: jest.fn(),
  onRemoveUser: jest.fn(),
  onNameChange: jest.fn(),
  codeText: "test code text",
  tags: ["tag1", "tag2", "tag3"],
  name: "file name",
  createDate: "1-1-1",
  users: ["user1", "user2"],
  isLocked: false,
  accountName: "accountName1",
  remountContentEditable: 0
};

const wrapper = mount(<EditorComponent {...props} />);

const contentEditable = wrapper.find(ContentEditable);

describe("EditorComponent", () => {
  test("renders correctly", () => {
    const component = renderer.create(<EditorComponent {...props} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("it renders ContentEditable", () => {
    expect(contentEditable.length).toEqual(1);
  });

  test("it does not call mockFunction before 2.5 seconds", () => {
    contentEditable.simulate("change");
    expect(mockBatchUpdate).not.toBeCalled();
  });

  test("it does call mockFunction after 2.5 seconds", () => {
    contentEditable.simulate("change");
    setTimeout(() => {
      expect(mockBatchUpdate.mock.calls.length).toEqual(2);
    }, 2600);
  });

  test("delay resets the timer whenever another change is called", () => {
    for (let i = 0; i < 10; i++) {
      contentEditable.simulate("change");
    }

    expect(mockBatchUpdate.mock.calls.length).toBeLessThan(4);
  });
});
