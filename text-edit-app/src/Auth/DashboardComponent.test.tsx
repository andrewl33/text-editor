import * as React from "react";
import * as renderer from "react-test-renderer";
import { DashboardComponent } from "./DashboardComponent";

const authProps = {
  dashboard: { collections: [], files: [] }
};

const dispatchProps = {
  onCollectionClick: jest.fn(),
  onFileClick: jest.fn()
};

const props = {
  ...authProps,
  ...dispatchProps
};

describe("DashboardComponent", () => {
  test("renders correctly", () => {
    const component = renderer.create(<DashboardComponent {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
