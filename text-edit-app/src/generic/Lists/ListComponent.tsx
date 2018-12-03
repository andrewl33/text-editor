import * as React from "react";
import { Button, Dropdown, Icon, Label, Table } from "semantic-ui-react";
import allData from "../../ShowAll/fetchAllData";
import { ListProps } from "../../types";

export class ListComponent extends React.Component<
  ListProps,
  { itemInput: string; fileList: string[]; colList: string[] }
> {
  constructor(props: ListProps) {
    super(props);

    this.state = {
      itemInput: "",
      fileList: [],
      colList: []
    };
  }

  public componentDidMount = async () => {
    const body = await allData(false);
    this.setState({
      fileList: body.allInfo.codeFileInfo.map((obj: any) => {
        return obj.url;
      }),
      colList: body.allInfo.collectionInfo.map((obj: any) => {
        return obj.url;
      })
    });
  };

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
          <Button.Group color="blue">
            <Button type="submit" onClick={this.handleNewItemInput}>
              Add {this.props.header === "Files" ? "File" : "Collection"}
            </Button>
            <Dropdown
              floating={true}
              button={true}
              placeholder={
                this.props.header === "Files"
                  ? "File url..."
                  : "Collection url..."
              }
              options={
                this.props.header === "Files"
                  ? this.state.fileList
                      .filter((i: string) => {
                        return (
                          this.props.items
                            .map((e: any) => {
                              return e.id;
                            })
                            .indexOf(i) === -1
                        );
                      })
                      .map((i: string, idx: number) => {
                        return { key: idx, value: i, text: i };
                      })
                  : this.state.colList
                      .filter((i: string) => {
                        return (
                          this.props.items
                            .map((e: any) => {
                              return e.id;
                            })
                            .indexOf(i) === -1
                        );
                      })
                      .map((i: string, idx: number) => {
                        return { key: idx, value: i, text: i };
                      })
              }
              onChange={this.handleInput}
            />
          </Button.Group>
        )}
      </div>
    );
  }

  private handleInput = (e: React.SyntheticEvent, data: any) => {
    this.setState({ itemInput: data.value });
  };

  private handleNewItemInput = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.onAdd!(this.state.itemInput);
  };
}
