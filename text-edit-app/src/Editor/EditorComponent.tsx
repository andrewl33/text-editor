import * as React from 'react';
// import * as Prism from 'prismjs';
import ContentEditable, { RefObject } from "react-sane-contenteditable";
import { EditorProps } from '../types';
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
    }
  }

  public render() {
    return (
      <div className="editor language-javascript" ref={this.myRef}>
        <ContentEditable
          className="code-line editor"
          content={this.state.text}
          editable={true}
          multiLine={true}
          onChange={this.handleChange}
        />
      </div>
    )
  }

  private handleChange = (e: React.SyntheticEvent, val: string) => {
    this.setState({text: val});
    clearTimeout(this.delayBeforeUpdate);
    this.delay();
  }

  private delay = () => {
    // uses browser's setTimeout instead of node
    this.delayBeforeUpdate = window.setTimeout(() => {
      this.props.onBatchUpdate(this.state.text);
    }, 2500);
  }
}

export default EditorComponent;