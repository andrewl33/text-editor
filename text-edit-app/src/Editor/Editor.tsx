import * as React from 'react';
import { Container } from 'semantic-ui-react';
import cursorManager from './cursorManager';

// declare global {
//   interface Array<T> {
//     contains(obj: any): boolean;
//   }
// }

class Editor extends React.Component {
  private myRef: any;

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }

  public handleInput = (e: any) => {
    (window as any).Prism.highlightAll();
    // tslint:disable-next-line
    console.log(this.myRef);
    // (window as any).cursorManager.setEndOfContenteditable(this.myRef.current);
    cursorManager(this.myRef.current);
  }



  public render() {
    return (
      <div ref={this.myRef}>
        <Container 
        className="editor language-js" 
        fluid={true} 
        contentEditable="true"
        onInput={this.handleInput}
 
        >
          var wow = "yes";
          function same() &#123; return best; &#125;
        </Container>
      </div>
      
    );
  }
}

export default Editor;