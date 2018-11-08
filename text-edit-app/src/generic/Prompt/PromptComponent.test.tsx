import { mount } from "enzyme";
import * as React from "react";
import { Button, Input } from "semantic-ui-react";
import { PromptComponentProps } from "../../types";
import { PromptComponent } from "./PromptComponent";

const props: PromptComponentProps = {
  getAccountCredentials: jest.fn(),
  onClosePrompt: jest.fn(),
  getPassword: jest.fn(),
  lockItem: jest.fn(),
  prompt: "Private File"
};

const promptComponent = mount(<PromptComponent {...props} />);

describe("PromptComponent", () => {
  beforeEach(() => {
    promptComponent.setProps({ ...props } as Pick<any, any>);
    jest.clearAllMocks();
  });

  // close calls close
  test("close button calls onClosePrompt", () => {
    promptComponent.setProps({ prompt: "Login" });
    promptComponent
      .find(Button)
      .at(1)
      .simulate("click");
    expect((props.onClosePrompt as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  // login shows two inputs
  test("login shows two inputs", () => {
    promptComponent.setProps({ prompt: "Login" });
    expect(promptComponent.find(Input).length).toBe(2);
  });

  // login calls login
  test("login calls onLogin", () => {
    promptComponent.setProps({ prompt: "Login" });
    promptComponent
      .find(Button)
      .at(0)
      .simulate("click");
    expect(
      (props.getAccountCredentials as jest.Mock<{}>).mock.calls.length
    ).toBe(1);
  });

  // everything else calls 1
  test("private file/collection, lock only has a password", () => {
    const promptList = ["Private Collection", "Private File", "Lock"];

    for (const p of promptList) {
      promptComponent.setProps({ prompt: p });

      expect(promptComponent.find(Input).length).toBe(1);
    }
  });

  test("private collection calls getPassword", () => {
    promptComponent.setProps({ prompt: "Private Collection" });
    promptComponent
      .find(Button)
      .at(0)
      .simulate("click");
    expect((props.getPassword as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  test("private file calls getPassword", () => {
    promptComponent.setProps({ prompt: "Private File" });
    promptComponent
      .find(Button)
      .at(0)
      .simulate("click");
    expect((props.getPassword as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  test("password protecting an item calls lockItem", () => {
    promptComponent.setProps({ prompt: "Lock" });
    promptComponent
      .find(Button)
      .at(0)
      .simulate("click");
    expect((props.lockItem as jest.Mock<{}>).mock.calls.length).toBe(1);
  });
});
