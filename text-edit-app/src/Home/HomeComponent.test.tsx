import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import * as React from "react";
import { Button, Form } from "semantic-ui-react";
import HomeComponent from "./HomeComponent";
let wrapper: any;

const stateProps = {
  loggedIn: false
};

const dispatchProps = {
  onLogin: jest.fn(),
  onNewFile: jest.fn(),
  onNewCollection: jest.fn(),
  toDashboard: jest.fn(),
  onCreateAccount: jest.fn(),
  toGradingPage: jest.fn()
};

describe("HomeComponent", () => {
  beforeEach(() => {
    wrapper = mount(<HomeComponent {...stateProps} {...dispatchProps} />);
    jest.clearAllMocks();
  });

  describe("Logged out", () => {
    test("it renders", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("toDashboard is not shown", () => {
      const buttons = wrapper.find(Button);

      buttons.forEach((btn: any) => {
        btn.simulate("click");
      });

      expect(dispatchProps.toDashboard.mock.calls.length).toBe(0);
    });

    test("error on empty input submit", () => {
      const buttons = wrapper.find(Button);

      buttons.forEach((btn: any) => {
        btn.simulate("click");
      });

      expect(toJson(wrapper)).toMatchSnapshot();
      expect(
        wrapper
          .find(Form.Field)
          .at(0)
          .props().error
      ).toBe(true);
    });
  });

  describe("logged in", () => {
    beforeEach(() => {
      wrapper.setProps({ loggedIn: true });
    });

    test("it renders", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("it has 3 buttons", () => {
      expect(wrapper.find(Button).length).toBe(3);
    });
  });
});
