import * as React from 'react';
import { Container } from 'semantic-ui-react';


class Editor extends React.Component {

  public handleInput = () => {
    (window as any).Prism.highlightAll();
  }

  public render() {
    return (
      <Container 
        className="editor language-js" 
        fluid={true} 
        contentEditable="true"
        onInput={this.handleInput}
      >
        var wow = "yes";
        function same() &#123; return best; &#125;
      </Container>
    );
  }
}

export default Editor;