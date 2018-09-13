import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { History } from 'history';
import { Container } from 'semantic-ui-react';
import EditorContainer from './Editor/EditorContainer';
import { history } from './store';

interface AppProps {
  history: History;
}

class App extends React.Component<AppProps> {
  public render() {
    return (
      <Container className="App" fluid={true}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact={true} path="/*/" component={EditorContainer} />
          </Switch>
        </ConnectedRouter>
      </Container>
    );
  }
}

export default App;
