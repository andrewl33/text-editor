import * as React from 'react';
import { Container } from 'semantic-ui-react';
import EditorContainer from './Editor/EditorContainer';

class App extends React.Component {
  public render() {
    return (
      <Container className="App" fluid={true}>
          <EditorContainer />
      </Container>
    );
  }
}

export default App;
