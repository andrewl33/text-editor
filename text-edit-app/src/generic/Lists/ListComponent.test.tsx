import { mount } from "enzyme";
import * as React from "react";
import { Button, Input, Table } from "semantic-ui-react";
import { ListProps } from "../../types";
import { ListComponent } from "./ListComponent";

const fileProps: ListProps = {
  header: "Files",
  items: [
    {
      id: "1",
      name: "name1",
      tags: ["tag1", "tag2", "tag3"],
      date: "1-1-1"
    },
    {
      id: "2",
      name: "name2",
      tags: ["tag1", "tag2", "tag3"],
      date: "2-2-2"
    },
    {
      id: "3",
      name: "name3",
      tags: ["tag1", "tag2", "tag3"],
      date: "3-3-3"
    }
  ],
  onRemove: jest.fn(),
  onAdd: jest.fn(),
  onClickToPage: jest.fn()
};

const colProps: ListProps = {
  header: "Collections",
  items: [
    {
      id: "1",
      name: "name1",
      date: "1-1-1"
    },
    {
      id: "2",
      name: "name2",
      date: "2-2-2"
    },
    {
      id: "3",
      name: "name3",
      date: "3-3-3"
    }
  ],
  onRemove: jest.fn(),
  onAdd: jest.fn(),
  onClickToPage: jest.fn()
};

describe("ListComponent", () => {
  describe("Files", () => {
    const listComponent = mount(<ListComponent {...fileProps} />);

    beforeEach(() => {
      listComponent.setProps({ ...fileProps } as Pick<any, any>);
      jest.clearAllMocks();
    });

    test("renders header with name, tags, createDate, and close", () => {
      const headers = listComponent.find(Table.HeaderCell);
      expect(headers.length).toBe(4);
    });

    test("calls clickToPage when name is clicked", () => {
      const tableRows = listComponent.find(Table.Body).find(Table.Row);

      for (let i = 0; i < fileProps.items.length; i++) {
        tableRows
          .at(i)
          .find(Table.Cell)
          .at(0)
          .simulate("click");
      }

      expect((fileProps.onClickToPage as jest.Mock<{}>).mock.calls.length).toBe(
        fileProps.items.length
      );
    });

    test("calls onRemove when delete is clicked", () => {
      const tableRows = listComponent.find(Table.Body).find(Table.Row);

      for (let i = 0; i < fileProps.items.length; i++) {
        tableRows
          .at(i)
          .find(Table.Cell)
          .at(3)
          .find(Button)
          .simulate("click");
      }

      expect((fileProps.onRemove as jest.Mock<{}>).mock.calls.length).toBe(
        fileProps.items.length
      );
    });

    test("calls on add when add is clicked", () => {
      listComponent
        .find(Input)
        .find(Button)
        .simulate("click");
      expect((fileProps.onAdd as jest.Mock<{}>).mock.calls.length).toBe(1);
    });
  });

  describe("Collections", () => {
    const listComponent = mount(<ListComponent {...colProps} />);

    beforeEach(() => {
      listComponent.setProps({ ...colProps } as Pick<any, any>);
      jest.clearAllMocks();
    });

    test("renders header with name, createDate, and close", () => {
      const headers = listComponent.find(Table.HeaderCell);
      expect(headers.length).toBe(3);
    });

    test("calls clickToPage when name is clicked", () => {
      const tableRows = listComponent.find(Table.Body).find(Table.Row);

      for (let i = 0; i < colProps.items.length; i++) {
        tableRows
          .at(i)
          .find(Table.Cell)
          .at(0)
          .simulate("click");
      }

      expect((colProps.onClickToPage as jest.Mock<{}>).mock.calls.length).toBe(
        colProps.items.length
      );
    });

    test("calls onRemove when delete is clicked", () => {
      const tableRows = listComponent.find(Table.Body).find(Table.Row);

      for (let i = 0; i < colProps.items.length; i++) {
        tableRows
          .at(i)
          .find(Table.Cell)
          .at(2)
          .find(Button)
          .simulate("click");
      }

      expect((colProps.onRemove as jest.Mock<{}>).mock.calls.length).toBe(
        colProps.items.length
      );
    });

    test("calls on add when add is clicked", () => {
      listComponent
        .find(Input)
        .find(Button)
        .simulate("click");
      expect((colProps.onAdd as jest.Mock<{}>).mock.calls.length).toBe(1);
    });
  });
});
