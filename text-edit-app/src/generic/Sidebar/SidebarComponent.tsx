import * as React from "react";
import { Icon, Input, Label, List } from "semantic-ui-react";
import { SidebarProps } from "../../types";

interface SidebarState {
  nameInput: string;
  tagType: string;
  nameEdit: boolean;
  tagEdit: boolean;
}

export default class SidebarComponent extends React.Component<
  SidebarProps,
  SidebarState
> {
  constructor(props: SidebarProps) {
    super(props);

    this.state = {
      nameInput: this.props.name,
      tagType: "",
      nameEdit: false,
      tagEdit: false
    };
  }

  public render() {
    const { nameInput, nameEdit, tagType, tagEdit } = this.state;
    const {
      pageType,
      name,
      createDate,
      users,
      isPrivate,
      onRemoveTag
    } = this.props;
    const nameField = !nameEdit ? (
      <span>
        {name}
        <Icon link={true} name="edit" onClick={this.openNameEdit} />
      </span>
    ) : (
      <span>
        <Input
          placeholder="New name"
          value={nameInput}
          onChange={this.onNameInputChange}
        />
        <Icon link={true} name="save outline" onClick={this.onNameChange} />
        <Icon link={true} name="close" onClick={this.onNameClose} />
      </span>
    );
    const tagField = tagEdit ? (
      <span>
        <Input
          placeholder="New tag"
          value={tagType}
          onChange={this.onTagInputChange}
        />
        <Icon link={true} name="save" onClick={this.onTagAdd} />
        <Icon link={true} name="close" onClick={this.onTagClose} />
      </span>
    ) : (
      <Icon link={true} name="add" onClick={this.openTagEdit} />
    );

    let tags: JSX.Element[] | undefined;
    if (pageType === "file") {
      const { tagList } = this.props;

      tags =
        tagList &&
        tagList.map((tag: string, idx: number) => {
          return (
            <Label
              key={idx}
              link={true}
              onClick={onRemoveTag && onRemoveTag.bind(tag)}
            >
              {tag}
              <Icon name="close" />
            </Label>
          );
        });
    }

    const usersElement =
      users &&
      users.map((user: string, idx: number) => {
        return <Label key={idx}>{user}</Label>;
      });

    return (
      <List style={{ height: "100%" }}>
        <List.Item>
          <List.Header>Name</List.Header>
          {nameField}
        </List.Item>
        <List.Item>
          <List.Header>Date</List.Header>
          {createDate}
        </List.Item>
        <List.Item>
          <List.Header>Private</List.Header>
          {isPrivate ? "Yes" : "No"}
        </List.Item>
        <List.Item>
          <List.Header>Users</List.Header>
          {usersElement}
        </List.Item>
        {pageType === "file" && (
          <List.Item>
            <List.Header>Tags</List.Header>
            <span>
              {tags}
              {tagField}
            </span>
          </List.Item>
        )}
      </List>
    );
  }

  private openNameEdit = () => {
    this.setState({ nameEdit: true, nameInput: "" });
  };

  private onNameChange = () => {
    this.setState({ nameEdit: false });
    this.props.onNameChange(this.state.nameInput);
  };

  private onNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ nameInput: e.target.value });
  };

  private onNameClose = () => {
    this.setState({ nameEdit: false });
  };

  private openTagEdit = () => {
    this.setState({ tagEdit: true, tagType: "" });
  };

  private onTagAdd = () => {
    this.setState({ tagEdit: false });
    if (this.props.onAddTag) {
      this.props.onAddTag(this.state.tagType);
    }
  };

  private onTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tagType: e.target.value });
  };

  private onTagClose = () => {
    this.setState({ tagEdit: false });
  };
}
