import * as React from 'react';
import { Container } from 'semantic-ui-react';
import TopHeader from './Header/Header';

class App extends React.Component {
  public render() {
    return (
      <Container className="App" fluid={true}>
        <Container fluid={true}>
          <TopHeader />
        </Container>
      </Container>
    );
  }
}

export default App;
