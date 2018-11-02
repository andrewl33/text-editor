import * as React from "react";
import { Button, Icon, Input, Label, Table } from "semantic-ui-react";
import { ListProps } from "../../types";

export class ListComponent extends React.Component<
  ListProps,
  { itemInput: string }
> {
  constructor(props: ListProps) {
    super(props);

    this.state = {
      itemInput: ""
    };
  }

  public render() {
    const listItems =
      this.props.items &&
      this.props.items.map((item, index) => {
        return (
          <Table.Row key={index}>
            <Table.Cell
              colSpan="2"
              selectable={true}
              style={{ padding: ".92857143em .78571429em" }}
              onClick={this.props.onClickToPage.bind(null, item.id)}
            >
              {item.name !== "" && item.name ? item.name : item.id}
            </Table.Cell>
            {this.props.header === "Files" && (
              <Table.Cell>
                {item.tags &&
                  item.tags.map((tag: string, idx: number) => {
                    return <Label key={idx}>{tag}</Label>;
                  })}
              </Table.Cell>
            )}
            <Table.Cell colSpan={2}>{item.date}</Table.Cell>
            {this.props.onRemove && (
              <Table.Cell colSpan={2}>
                <Button onClick={this.props.onRemove.bind(null, item.id)}>
                  <Icon name="close" />
                </Button>
              </Table.Cell>
            )}
          </Table.Row>
        );
      });

    return (
      <div>
        <Table
          celled={true}
          inverted={true}
          size="large"
          verticalAlign="middle"
          relaxed="true"
          divided="true"
          color="blue"
          style={{ color: "rgba(255,255,255,.9)", borderRadius: 0 }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
                {this.props.header}
              </Table.HeaderCell>
              {this.props.header === "Files" && (
                <Table.HeaderCell>Tags</Table.HeaderCell>
              )}
              <Table.HeaderCell colSpan="2">Dates</Table.HeaderCell>
              {this.props.onRemove && (
                <Table.HeaderCell colSpan="2">Delete</Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>{listItems}</Table.Body>
        </Table>
        {this.props.onAdd && (
          <Input
            placeholder={
              this.props.header === "Files"
                ? "File url..."
                : "Collection url..."
            }
            onChange={this.handleInput}
            value={this.state.itemInput}
          >
            <input />

            <Button type="submit" onClick={this.handleNewItemInput}>
              Add
            </Button>
          </Input>
        )}
      </div>
    );
  }

  private handleInput = (e: React.SyntheticEvent) => {
    this.setState({ itemInput: (e.target as HTMLInputElement).value });
  };

  private handleNewItemInput = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.onAdd!(this.state.itemInput);
  };
}
