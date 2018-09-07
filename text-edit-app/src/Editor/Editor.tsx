import * as React from 'react';
import ContentEditable from "react-sane-contenteditable";
// import { Container, List } from 'semantic-ui-react';
// import CodeLine from './CodeLine';
// import cursorManager from './cursorManager';

interface EditorState {
  lineNum: number;
  text: string;
}

class Editor extends React.Component<{}, EditorState> {

  constructor(props: any) {
    super(props);

    this.state = {
      lineNum: 1,
      text: "Your text here"
    }
  }

  public handleChange= (e: React.SyntheticEvent , val: string) => {
    // tslint:disable-next-line
    console.log(val);
    this.setState({text: val});
  }

  public render() {
    return (
        <ContentEditable
          className="code-line editor"
          content={this.state.text}
          editable={true}
          multiLine={true}
          onChange={this.handleChange}
        />
    )
  }
}

export default Editor;