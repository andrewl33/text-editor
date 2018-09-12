import * as React from 'react';
import { Container } from 'semantic-ui-react';
import EditorContainer from './Editor/EditorContainer';
import HeaderContainer from './Header/HeaderContainer';

class App extends React.Component {
  public render() {
    return (
      <Container className="App" fluid={true}>
        <Container fluid={true}>
          <HeaderContainer />
        </Container>
        <Container fluid={true}>
          <EditorContainer />
        </Container>
      </Container>
    );
  }
}

export default App;
