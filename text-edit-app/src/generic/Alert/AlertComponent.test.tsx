import { mount } from "enzyme";
import * as React from "react";
import AlertComponent from "./AlertComponent";

const props = {
  message: "test",
  open: true
};

const wrapper = mount(<AlertComponent {...props} />);

// smoke test
// we assume that semantic-react-ui is tested
describe("AlertComponent", () => {
  test("it renders", () => {
    expect(wrapper.find(".transition").length).toBeGreaterThan(0);
  });
});
