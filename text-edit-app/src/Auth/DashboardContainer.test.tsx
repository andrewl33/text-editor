import * as React from "react";
import * as renderer from "react-test-renderer";
import { PromptType } from "../types";
import { DashboardContainer } from "./DashboardContainer";
const authProps = {
  authPrompt: false,
  accountName: "",
  loggedIn: false,
  dashboard: { collections: [], files: [] },
  openAlert: false,
  alertMessage: "default"
};

const dispatchProps = {
  onAlert: jest.fn(),
  onLogInPrompt: jest.fn(),
  onLogOut: jest.fn(),
  onClosePrompt: jest.fn(),
  onAuthAccount: jest.fn(),
  onCollectionClick: jest.fn(),
  onFileClick: jest.fn(),
  onHomeClick: jest.fn(),
  onMount: jest.fn(),
  toGradingPage: jest.fn()
};

const staticProps = {
  isShareable: false,
  pageName: "Dashboard",
  prompt: "Login" as PromptType
};

const props = {
  ...authProps,
  ...dispatchProps,
  ...staticProps
};

describe("DashboardContainer", () => {
  test("not logged in renders correctly", () => {
    const component = renderer.create(<DashboardContainer {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("logged in renders correctly", () => {
    const loggedInProps = { ...props, loggedIn: true, accountName: "test" };

    const component = renderer.create(
      <DashboardContainer {...loggedInProps} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
