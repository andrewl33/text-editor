import * as React from "react";
import { Label, Table } from "semantic-ui-react";
import { ListProps } from "../../types";

export const ListComponent = (
  props: ListProps
): React.ReactElement<ListProps> => {
  const listItems =
    props.items &&
    props.items.map((item, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell colSpan="2">
            {item.name !== "" ? item.name : item.uuid}
          </Table.Cell>
          {props.header === "Files" && (
            <Table.Cell>
              {item.tags &&
                item.tags.map((tag: string, idx: number) => {
                  return <Label key={idx}>{tag}</Label>;
                })}
            </Table.Cell>
          )}
          <Table.Cell textAlign="right" width={2}>
            {item.date}
          </Table.Cell>
        </Table.Row>
      );
    });

  return (
    <Table
      celled={true}
      inverted={true}
      size="large"
      verticalAlign="middle"
      relaxed={true}
      divided={true}
      color="blue"
      style={{ color: "rgba(255,255,255,.9)", borderRadius: 0 }}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">{props.header}</Table.HeaderCell>
          {props.header === "Files" && (
            <Table.HeaderCell>Tags</Table.HeaderCell>
          )}
          <Table.HeaderCell colSpan="2">Dates</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{listItems}</Table.Body>
    </Table>
  );
};
