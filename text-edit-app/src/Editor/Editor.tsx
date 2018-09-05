import * as React from 'react';
import { Container } from 'semantic-ui-react';

declare global {
  interface Array<T> {
    contains(obj: any): boolean;
  }
}

class Editor extends React.Component {
  private myRef: any;
  constructor(props: any) {
    super(props);
    this.state = {1:1};
    this.myRef = React.createRef();
  }
  public handleInput = (e: any) => {
    (window as any).Prism.highlightAll();
    // tslint:disable-next-line
    console.log(this.myRef);
    (window as any).cursorManager.setEndOfContenteditable(this.myRef.current);
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

(function( cursorManager ) {

  //From: http://www.w3.org/TR/html-markup/syntax.html#syntax-elements
  var voidNodeTags: string[] = ['AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'MENUITEM', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR', 'BASEFONT', 'BGSOUND', 'FRAME', 'ISINDEX', 'SPAN'];

  //From: https://stackoverflow.com/questions/237104/array-containsobj-in-javascript


  Array.prototype.contains = function(obj: any): boolean {
      var i = this.length;
      while (i--) {
          if (this[i] === obj) {
              return true;
          }
      }
      return false;
  }

  //Basic idea from: https://stackoverflow.com/questions/19790442/test-if-an-element-can-contain-text
  function canContainText(node: any) {
      if(node.nodeType == 1) { //is an element node
          return !voidNodeTags.contains(node.nodeName);
      } else { //is not an element node
          return false;
      }
  };

  function getLastChildElement(el :any){
      var lc = el.lastChild;
      while(lc && lc.nodeType != 1) {
          if(lc.previousSibling)
              lc = lc.previousSibling;
          else
              break;
      }
      return lc;
  }

  //Based on Nico Burns's answer
  cursorManager.setEndOfContenteditable = function(contentEditableElement:any)
  {

      while(getLastChildElement(contentEditableElement) &&
            canContainText(getLastChildElement(contentEditableElement))) {
          contentEditableElement = getLastChildElement(contentEditableElement);
      }

      var range,selection;
      if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
      {    
          range = document.createRange();//Create a range (a range is a like the selection but invisible)
          range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
          range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
          selection = window.getSelection();//get the selection object (allows you to change selection)
          selection.removeAllRanges();//remove any selections already made
          selection.addRange(range);//make the range you have just created the visible selection
      }
  }

}( (window as any).cursorManager = (window as any).cursorManager || {}));
export default Editor;