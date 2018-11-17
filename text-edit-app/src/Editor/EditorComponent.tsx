import * as React from "react";

import AceEditor from "react-ace";

import { Container, Grid } from "semantic-ui-react";
import Sidebar from "../generic/Sidebar/SidebarComponent";
import { EditorComponentProps } from "../types";

import "brace/mode/javascript";
import "brace/theme/monokai";
interface EditorPrivateState {
  text: string;
}

class EditorComponent extends React.Component<
  EditorComponentProps,
  EditorPrivateState
> {
  private delayBeforeUpdate: number;
  private aceContainerRef: React.RefObject<any>;
  constructor(props: EditorComponentProps) {
    super(props);

    this.aceContainerRef = React.createRef();

    this.state = {
      text: this.props.codeText
    };
  }

  public render() {
    const {
      name,
      tags,
      createDate,
      isLocked,
      users,
      onRemoveTag,
      onAddTag,
      onAddUser,
      onRemoveUser,
      onNameChange,
      accountName
    } = this.props;

    return (
      <Grid style={{ marginTop: 0, height: "100%" }}>
        <Grid.Column width={13} style={{ padding: 0 }}>
          <div
            ref={this.aceContainerRef}
            style={{ height: "100%", width: "100%" }}
          >
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.handleChange}
              name="ace-editor"
              height="100%"
              width="100%"
              value={this.state.text}
              fontSize={16}
              style={{ position: "absolute" }}
            />
          </div>
        </Grid.Column>
        <Grid.Column
          width={3}
          textAlign="center"
          style={{
            paddingRight: "2em",
            backgroundColor: "#3180d4",
            height: "100%"
          }}
        >
          <Container>
            <Sidebar
              name={name}
              pageType="file"
              tagList={tags}
              allTagsList={["wow", "same same"]} // TODO:
              createDate={createDate}
              isPrivate={isLocked}
              users={users}
              onRemoveTag={onRemoveTag}
              onAddTag={onAddTag}
              onNameChange={onNameChange}
              onAddUser={onAddUser}
              onRemoveUser={onRemoveUser}
              accountName={accountName}
            />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }

  private handleChange = (value: string, e: React.SyntheticEvent) => {
    this.setState({ text: value });
    this.props.onLocalUpdate(value);
    clearTimeout(this.delayBeforeUpdate);
    this.delay();
  };

  private delay = () => {
    // uses browser's setTimeout instead of node
    this.delayBeforeUpdate = window.setTimeout(() => {
      this.props.onBatchUpdate();
    }, 2500);
  };
}

export default EditorComponent;
