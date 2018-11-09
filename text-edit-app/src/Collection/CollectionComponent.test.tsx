import * as React from "react";
import * as renderer from "react-test-renderer";
import { CollectionComponent } from "./CollectionComponent";

const items = [
  {
    id: "1",
    name: "name1",
    tags: [],
    date: "1-1-2001"
  }
];

const props = {
  name: "test",
  createDate: "1-1-2001",
  isLocked: false,
  users: ["user1", "user2"],
  onNameChange: jest.fn(),
  onAddUser: jest.fn(),
  onRemoveUser: jest.fn(),
  onAddFile: jest.fn(),
  items,
  onRemoveFile: jest.fn(),
  onFileClick: jest.fn(),
  accountName: ""
};

describe("CollectionComponent", () => {
  test("renders correctly", () => {
    const component = renderer.create(<CollectionComponent {...props} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
