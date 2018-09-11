import * as React from 'react';
import { Container } from 'semantic-ui-react';
import Editor from './Editor/Editor';
import TopHeader from './Header/HeaderContainer';

class App extends React.Component {
  public render() {
    return (
      <Container className="App" fluid={true}>
        <Container fluid={true}>
          <TopHeader />
        </Container>
        <Container fluid={true}>
          <Editor/>
        </Container>
      </Container>
    );
  }
}

export default App;
