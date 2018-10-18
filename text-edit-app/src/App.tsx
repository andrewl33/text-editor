import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { History } from 'history';
import { Container } from 'semantic-ui-react';

import DashboardContainer from './Auth/DashboardContainer';
import EditorContainer from './Editor/EditorContainer';
import CollectionContainer from './Collection/CollectionContainer';
import { history } from './store';

import { StoreState } from './types';



interface AppProps {
  history: History;
}

class App extends React.Component<AppProps | StoreState> {
  public render() {
    return (
      <Container className="App" fluid={true}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/dashboard/" component={DashboardContainer} />
            <Route exact={true} path="/files/*" component={EditorContainer} />
            <Route path="/collections/*" component={CollectionContainer} />
          </Switch>
        </ConnectedRouter>
      </Container>
    );
  }
}

export default App;
