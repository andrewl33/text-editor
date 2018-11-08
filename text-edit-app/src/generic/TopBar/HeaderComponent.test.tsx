import { mount } from "enzyme";
import * as React from "react";
import { Button, Dropdown } from "semantic-ui-react";
import AlertComponent from "../Alert/AlertComponent";
import { PromptComponent } from "../Prompt/PromptComponent";
import { HeaderComponent } from "./HeaderComponent";

// does not include props passed down to prompt

const props = {
  onNew: jest.fn(),
  onLock: jest.fn(),
  onAlert: jest.fn(),
  onDashboard: jest.fn(),
  onLogOut: jest.fn(),
  onLogInPrompt: jest.fn(),
  onHomeClick: jest.fn(),
  accountName: undefined,
  loggedIn: false,
  pathname: "/test",
  isShareable: true,
  openAlert: false,
  alertMessage: "test alert message",
  pageName: "file",
  onPrompt: false,
  message: "test alert message"
};

// https://github.com/mattermost/mattermost-webapp/pull/228
// handles document.execCommand for copy
const supportedCommands = ["copy"];

Object.defineProperty(document, "queryCommandSupported", {
  value: (cmd: any) => (supportedCommands as any).includes(cmd)
});

Object.defineProperty(document, "execCommand", {
  value: (cmd: any) => (supportedCommands as any).includes(cmd)
});

const wrapper = mount(<HeaderComponent {...props} />);

describe("HeaderComponent", () => {
  beforeEach(() => {
    wrapper.setProps({ ...props });
  });

  test("renders all buttons", () => {
    expect(wrapper.find(Button).length).toEqual(3);
  });

  test("renders new and lock buttons", () => {
    wrapper.setProps({ isShareable: false });
    expect(wrapper.find(Button).length).toEqual(2);
  });

  test("renders no buttons", () => {
    wrapper.setProps({
      isShareable: false,
      onNew: undefined,
      onLock: undefined
    });
    expect(wrapper.find(Button).length).toEqual(0);
  });

  test("calls new on click", () => {
    const button = wrapper.find(Button).at(0);
    button.simulate("click");
    expect(props.onNew.mock.calls.length).toBe(1);
  });

  test("mounts PromptComponent on lock", () => {
    const button = wrapper.find(Button).at(1);
    button.simulate("click");

    setTimeout(
      () => expect(wrapper.find(<PromptComponent />).length).toBe(1),
      1000
    );
  });

  test("unmounts PromptComponent on lock submit", () => {
    wrapper.setState({ onLockPrompt: false });

    setTimeout(
      () => expect(wrapper.find(<PromptComponent />).length).toBe(0),
      1000
    );
  });

  test("alert should not be visible", () => {
    expect(
      wrapper.find(
        <AlertComponent
          message={wrapper.props().message}
          open={wrapper.props().openAlert}
        />
      ).length
    ).toBe(0);
  });

  test("alert should mount on openAlert", () => {
    wrapper.setProps({ openAlert: true });
    setTimeout(
      () =>
        expect(
          wrapper.find(
            <AlertComponent
              message={wrapper.props().message}
              open={wrapper.props().openAlert}
            />
          ).length
        ).toBe(1),
      100
    );
  });

  test("logged in creates two Dropdown.Items", () => {
    wrapper.setProps({ loggedIn: true });
    const dropdown = wrapper.find(Dropdown.Item);

    expect(dropdown.length).toBe(2);
  });

  test("logged out dropdown creates 1 Dropdown.Item", () => {
    expect(wrapper.find(Dropdown.Item).length).toBe(1);
  });

  test("logged in Dropdown.Items click", () => {
    wrapper.setProps({ loggedIn: true });
    const dropdown = wrapper.find(Dropdown.Item);

    dropdown.forEach(b => {
      b.simulate("click");
    });

    expect(props.onDashboard.mock.calls.length).toBe(1);
    expect(props.onLogOut.mock.calls.length).toBe(1);
  });

  test("logged out Dropdown.Items click", () => {
    wrapper.find(Dropdown.Item).simulate("click");

    setTimeout(
      () => expect(wrapper.find(<PromptComponent />).length).toBe(1),
      1000
    );
  });

  test("true copy state deletes a textarea", () => {
    wrapper.setState({ copy: true });
    expect(wrapper.find(<textarea />).length).toEqual(0);
  });

  test("false copy state deletes a textarea", () => {
    wrapper.setState({ copy: false });
    expect(wrapper.find(<textarea />).length).toEqual(0);
  });
});
