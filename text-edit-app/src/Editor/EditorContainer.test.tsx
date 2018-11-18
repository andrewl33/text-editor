import { shallow } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { HeaderComponent } from "../generic/TopBar/HeaderComponent";
import EditorComponent from "./EditorComponent";
import { EditorContainer } from "./EditorContainer";

export const dispatchProps = {
  onLocalUpdate: jest.fn(),
  onBatchUpdate: jest.fn(),
  onCodeChange: jest.fn(),
  onAlert: () => jest.fn(),
  onLock: jest.fn(),
  onMount: jest.fn(),
  onNew: jest.fn(),
  onShare: jest.fn(),
  onAuthAccount: jest.fn(),
  onAuthFile: jest.fn(),
  onAddTag: jest.fn(),
  onRemoveTag: jest.fn(),
  onNameChange: jest.fn(),
  onAddUser: jest.fn(),
  onRemoveUser: jest.fn(),
  onLogInPrompt: jest.fn(),
  onClosePrompt: jest.fn(),
  onDashboard: jest.fn(),
  onLogOut: jest.fn(),
  onHomeClick: jest.fn(),
  toGradingPage: jest.fn()
};

const routerProps = {
  pathname: ""
};

const authProps = {
  accountName: "accountName",
  loggedIn: true,
  authPrompt: false
};

const editorStateProps = {
  codeText: "test",
  tags: ["tag1", "tag2"],
  isNewPage: false,
  isLocked: false,
  isSaved: false,
  openAlert: false,
  alertMessage: "none",
  filePrompt: false,
  name: "name1",
  createDate: "1-1-1",
  users: ["user1"],
  remountEditorComponent: 0
};

const staticProps = {
  pageName: "File"
};

const props = {
  ...dispatchProps,
  ...routerProps,
  ...authProps,
  ...editorStateProps,
  ...staticProps
};

const componentLoaded = shallow(
  <EditorContainer {...props} key={editorStateProps.remountEditorComponent} />
);
describe("EditorContainer", () => {
  test("renders correctly", () => {
    const component = renderer.create(
      <EditorContainer
        {...props}
        key={editorStateProps.remountEditorComponent}
      />
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("onMount called on mount", () => {
    expect(dispatchProps.onMount).toBeCalled();
  });

  test("Header Component loaded", () => {
    expect(componentLoaded.find(HeaderComponent).length).toEqual(1);
  });

  test("Editor Component loaded", () => {
    expect(componentLoaded.find(EditorComponent).length).toEqual(1);
  });
});
