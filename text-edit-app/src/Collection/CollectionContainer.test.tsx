import { shallow } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { HeaderComponent } from "../generic/TopBar/HeaderComponent";
import { CollectionComponent } from "./CollectionComponent";
import { CollectionContainer } from "./CollectionContainer";

const dispatchProps = {
  onNew: jest.fn(),
  onLock: jest.fn(),
  onShare: jest.fn(),
  onAlert: jest.fn(),
  onMount: jest.fn(),
  onAddFile: jest.fn(),
  onRemoveFile: jest.fn(),
  onAddUser: jest.fn(),
  onRemoveUser: jest.fn(),
  onAuthCollection: jest.fn(),
  onAuthAccount: jest.fn(),
  onNameChange: jest.fn(),
  onDashboard: jest.fn(),
  onLogInPrompt: jest.fn(),
  onLogOut: jest.fn(),
  onClosePrompt: jest.fn(),
  onFileClick: jest.fn(),
  onHomeClick: jest.fn()
};

const colProps = {
  openAlert: false,
  alertMessage: "None",
  items: [],
  name: "name",
  createDate: "1-1-2001",
  users: [],
  isLocked: false,
  collectionPrompt: false
};

const authProps = {
  accountName: "",
  loggedIn: false,
  authPrompt: false
};

const routerProps = {
  pathname: "/test"
};

const staticProps = {
  pageName: "Collection"
};

const props = {
  ...dispatchProps,
  ...colProps,
  ...authProps,
  ...routerProps,
  ...staticProps
};

const colContainer = shallow(<CollectionContainer {...props} />);

describe("CollectionContainer", () => {
  test("renders correctly", () => {
    const component = renderer.create(<CollectionContainer {...props} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("onMount called on mount", () => {
    expect(dispatchProps.onMount).toBeCalled();
  });

  test("Header Component loaded", () => {
    expect(colContainer.find(HeaderComponent).length).toEqual(1);
  });

  test("Collection Component loaded", () => {
    expect(colContainer.find(CollectionComponent).length).toEqual(1);
  });
});
