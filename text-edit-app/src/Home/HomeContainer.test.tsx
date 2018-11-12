import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import * as React from "react";

import { HomeContainer } from "./HomeContainer";

const stateProps = {
  loggedIn: false
};

const dispatchProps = {
  onLogin: jest.fn(),
  onNewFile: jest.fn(),
  onNewCollection: jest.fn(),
  toDashboard: jest.fn(),
  onCreateAccount: jest.fn()
};

let wrapper: any;

describe("HomeContainer", () => {
  wrapper = mount(<HomeContainer {...stateProps} {...dispatchProps} />);

  test("it renders", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
