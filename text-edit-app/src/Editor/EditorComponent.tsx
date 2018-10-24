import * as React from "react";
// import * as Prism from 'prismjs';
import ContentEditable, { RefObject } from "react-sane-contenteditable";
import { Container, Grid } from "semantic-ui-react";
import Sidebar from "../generic/Sidebar/SidebarComponent";

import { EditorProps } from "../types";
// import '../../node_modules/prismjs/themes/prism-okaidia.css';

interface EditorPrivateState {
  text: string;
}

class EditorComponent extends React.Component<EditorProps, EditorPrivateState> {
  private delayBeforeUpdate: number;
  private myRef: RefObject<any>;
  constructor(props: EditorProps) {
    super(props);

    this.myRef = React.createRef();

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
      onNameChange
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
              content={this.state.text}
              editable={true}
              multiLine={true}
              onChange={this.handleChange}
              style={{ padding: 0 }}
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
            />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }

  private handleChange = (e: React.SyntheticEvent, val: string) => {
    this.setState({ text: val });
    clearTimeout(this.delayBeforeUpdate);
    this.delay();
  };

  private delay = () => {
    // uses browser's setTimeout instead of node
    this.delayBeforeUpdate = window.setTimeout(() => {
      this.props.onBatchUpdate(this.state.text);
    }, 2500);
  };
}

export default EditorComponent;
