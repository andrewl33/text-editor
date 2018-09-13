import * as React from 'react';
import ContentEditable from "react-sane-contenteditable";
import { EditorProps } from '../types';

interface EditorPrivateState {
  text: string
}

class Editor extends React.Component<EditorProps, EditorPrivateState> {

  private delayBeforeUpdate: number;

  constructor(props: any) {
    super(props);

    this.state = {
      text: "Your text here"
    }
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


  private handleChange = (e: React.SyntheticEvent , val: string) => {
    this.setState({text: val});
    clearTimeout(this.delayBeforeUpdate);
    this.delay();
  }

  private delay = () => {
    // uses browser's setTimeout instead of node
    this.delayBeforeUpdate = window.setTimeout(() => this.props.onBatchUpdate(this.state.text), 2500);
  }


}

export default Editor;