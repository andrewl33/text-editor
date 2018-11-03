import * as React from "react";
// import * as Prism from 'prismjs';
import ContentEditable, { RefObject } from "react-sane-contenteditable";
import { Container, Grid } from "semantic-ui-react";
import Sidebar from "../generic/Sidebar/SidebarComponent";

import { EditorComponentProps } from "../types";
// import '../../node_modules/prismjs/themes/prism-okaidia.css';

interface EditorPrivateState {
  text: string;
}

// TODO: check https://github.com/ashleyw/react-sane-contenteditable/issues/31
// right now, the content editable does not listen to content correctly

// TODO: Update typings for react-sane-contenteditable
class EditorComponent extends React.Component<
  EditorComponentProps,
  EditorPrivateState
> {
  private delayBeforeUpdate: number;
  private myRef: RefObject<any>;
  constructor(props: EditorComponentProps) {
    super(props);

    this.myRef = React.createRef();
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
      codeText
    } = this.props;

    return (
      <Grid style={{ marginTop: 0, height: "100%" }}>
        <Grid.Column width={13}>
          <div
            className="editor language-javascript"
            ref={this.myRef}
            style={{ height: "100%" }}
          >
            <ContentEditable
              className="code-line editor"
              content={codeText}
              editable={true}
              multiLine={true}
              onKeyDown={this.handleChange}
              style={{ padding: 0, height: "100%" }}
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
              allTagsList={["woww", "samesame"]} // TODO:
              createDate={createDate}
              isPrivate={isLocked}
              users={users}
              onRemoveTag={onRemoveTag}
              onAddTag={onAddTag}
              onNameChange={onNameChange}
              onAddUser={onAddUser}
              onRemoveUser={onRemoveUser}
            />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }

  private handleChange = (e: React.SyntheticEvent, value: string) => {
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
