import { mount } from "enzyme";
import * as React from "react";
import { Icon, Input, Label, List } from "semantic-ui-react";
import { SidebarProps } from "../../types";
import SidebarComponent from "./SidebarComponent";

const props: SidebarProps = {
  name: "test sidebar name",
  pageType: "collection",
  tagList: undefined,
  allTagsList: undefined,
  createDate: "1-1-1990",
  isPrivate: false,
  users: [],
  accountName: undefined,
  onRemoveTag: jest.fn(),
  onAddTag: jest.fn(),
  onNameChange: jest.fn(),
  onAddUser: jest.fn(),
  onRemoveUser: jest.fn()
};

const state = {
  nameInput: props.name,
  tagType: "",
  nameEdit: false,
  tagEdit: false
};

const filledTagList = ["tag1", "tag2", "tag3"];
const filledUserList = ["user1", "user2"];

const wrapper = mount(<SidebarComponent {...props} />);

describe("SidebarComponent", () => {
  beforeEach(() => {
    wrapper.setProps({ ...props } as Pick<any, any>);
    wrapper.setState({ ...state });
    jest.clearAllMocks();
  });

  // test name renders props
  test("name is populated from props", () => {
    expect(wrapper.find(".name").text()).toBe(wrapper.props().name);
  });

  // test name opens on edit
  test("name input opens on edit", () => {
    let name = wrapper.find(".name");
    name.find(Icon).simulate("click");
    name = wrapper.find(".name");
    expect(name.find(Input).length).toBe(1);
  });

  // test name is set when submitted
  test("onNameChange is called on different input", () => {
    let name = wrapper.find(".name");
    name.find(Icon).simulate("click");

    wrapper.setState({ nameInput: "new name" });

    name = wrapper.find(".name");
    name
      .find("Icon")
      .at(0)
      .simulate("click");

    expect((props.onNameChange as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  // test name not called on same input
  test("onNameChange not called on same input", () => {
    let name = wrapper.find(".name");
    name.find(Icon).simulate("click");

    wrapper.setState({ nameInput: wrapper.props().name });

    name = wrapper.find(".name");
    name
      .find("Icon")
      .at(0)
      .simulate("click");

    expect((props.onNameChange as jest.Mock<{}>).mock.calls.length).toBe(0);
  });

  // test name input is closed on cancel
  // test name not called on same input
  test("name input closes on cancel", () => {
    let name = wrapper.find(".name");
    name.find(Icon).simulate("click");

    wrapper.setState({ nameInput: wrapper.props().name });

    name = wrapper.find(".name");
    name
      .find("Icon")
      .at(1)
      .simulate("click");

    expect((props.onNameChange as jest.Mock<{}>).mock.calls.length).toBe(0);
    expect(
      wrapper
        .find(".name")
        .find(Input)
        .exists()
    ).toBe(false);
  });

  // test date render
  test("date renders", () => {
    const listDateItem = wrapper.find(List.Item).at(1);

    expect(listDateItem.text()).toBe(
      "Date Created" + wrapper.props().createDate
    );
  });

  // test tags render nothing
  test("empty tags does not renders No Tags", () => {
    wrapper.setProps({ pageType: "file" });
    expect(wrapper.find(".tags").find(Label).length).toBe(0);
  });

  // test tags render list
  test("filled tags list renders", () => {
    wrapper.setProps({ pageType: "file", tagList: filledTagList });
    expect(wrapper.find(".tags").find(Label).length).toBe(filledTagList.length);
  });

  // test tags add open input
  test("tags input opens on add", () => {
    wrapper.setProps({ pageType: "file" });
    wrapper
      .find(".tags")
      .find(Icon)
      .simulate("click");
    expect(wrapper.find(".tags").find(Input).length).toBe(1);
  });

  test("calls add tag on input submit", () => {
    const event = {
      target: { value: "newTag" }
    };
    wrapper.setProps({ pageType: "file" });
    wrapper
      .find(".tags")
      .find(Icon)
      .simulate("click");
    wrapper
      .find(".tags")
      .find(Input)
      .simulate("change", event);
    wrapper
      .find(".tags")
      .find(Icon)
      .at(0)
      .simulate("click");
    expect((props.onAddTag as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  // test tag close input
  test("on add tag the input closes", () => {
    const event = {
      target: { value: "newTag" }
    };
    wrapper.setProps({ pageType: "file" });
    wrapper
      .find(".tags")
      .find(Icon)
      .simulate("click");
    wrapper
      .find(".tags")
      .find(Input)
      .simulate("change", event);
    wrapper
      .find(".tags")
      .find(Icon)
      .at(0)
      .simulate("click");
    expect(
      wrapper
        .find(".tags")
        .find(Input)
        .exists()
    ).toBe(false);
  });

  test("on cancel add tag input closes", () => {
    const event = {
      target: { value: "newTag" }
    };
    wrapper.setProps({ pageType: "file" });
    wrapper
      .find(".tags")
      .find(Icon)
      .simulate("click");
    wrapper
      .find(".tags")
      .find(Input)
      .simulate("change", event);
    wrapper
      .find(".tags")
      .find(Icon)
      .at(1)
      .simulate("click");
    expect(
      wrapper
        .find(".tags")
        .find(Input)
        .exists()
    ).toBe(false);
  });

  // test tags remove
  test("onRemoveTag called on click", () => {
    wrapper.setProps({ pageType: "file", tagList: filledTagList });
    wrapper
      .find(".tags")
      .find(Label)
      .at(0)
      .simulate("click");
    expect((props.onRemoveTag as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  // test tags collection
  test("tags does not render on collection", () => {
    expect(wrapper.find(".tags").exists()).toEqual(false);
  });

  // test user render
  test("no user renders No Users message", () => {
    expect(wrapper.find(".users > span").text()).toEqual("No Users");
  });

  // test user add
  test("add user", () => {
    wrapper.setProps({ accountName: "testUser" });
    wrapper
      .find(".users")
      .find(Icon)
      .simulate("click");
    expect((props.onAddUser as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  // test user remove does not exist
  test("user not in list, remove not exposed", () => {
    wrapper.setProps({ users: filledUserList, accountName: "testName" });
    const icon = wrapper.find(".users").find(Icon);

    expect(icon.length).toBe(1);
    expect(icon.props().name).toBe("add");
  });

  // test user add only on loggedin
  test("add user only renders when logged in", () => {
    expect(
      wrapper
        .find(".users")
        .find(Icon)
        .exists()
    ).toBe(false);

    wrapper.setProps({ accountName: "testName" });
    expect(
      wrapper
        .find(".users")
        .find(Icon)
        .exists()
    ).toBe(true);
  });

  test("remove user", () => {
    wrapper.setProps({ users: filledUserList, accountName: "user1" });
    wrapper
      .find(".users")
      .find(Icon)
      .simulate("click");
    expect((props.onRemoveUser as jest.Mock<{}>).mock.calls.length).toBe(1);
  });

  // test user remove does not exist
  test("user in list, add not exposed", () => {
    wrapper.setProps({ users: filledUserList, accountName: "user1" });
    const icon = wrapper.find(".users").find(Icon);

    expect(icon.length).toBe(1);
    expect(icon.props().name).toBe("close");
    expect(icon.props().name).not.toBe("add");
  });

  // test user add only on loggedin
  test("remove user only renders when logged in", () => {
    expect(
      wrapper
        .find(".users")
        .find(Icon)
        .exists()
    ).toBe(false);

    wrapper.setProps({ accountName: "user1" });
    expect(
      wrapper
        .find(".users")
        .find(Icon)
        .exists()
    ).toBe(true);
  });
});
