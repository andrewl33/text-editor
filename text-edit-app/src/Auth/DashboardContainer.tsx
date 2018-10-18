import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { HeaderComponent } from '../generic/TopBar/HeaderComponent';
import { DashboardComponent } from './DashboardComponent';
import { closeAlert } from './AuthAction';
import { StoreState } from '../types';


export class CollectionContainer extends React.Component<any> {
  public render() {

    const { accountName, authPrompt, loggedIn, dashboard, openAlert, alertMessage, onAlert } = this.props;
    const header = (
      <HeaderComponent 
        accountName={accountName}
        loggedIn={loggedIn}
        isShareable={false}
        openAlert={openAlert}
        alertMessage={alertMessage}
        pageName={'Dashboard'}
        onAlert={onAlert}
        onPrompt={authPrompt}
      />
    );

    if (!loggedIn) {
      return (
        <div>
          {header}
          Not logged in!
        </div>
      );
    } else {
      const { collections, files } = dashboard;
      return (
        <div>
          {header}
          <DashboardComponent
            files={files}
            collections={collections}
          />
        </div>
  
      );
    }
  }
}

const mapStateToProps = (state: StoreState) => {
  const { authPrompt, accountName, loggedIn, dashboard, openAlert, alertMessage } = state.authentication;

  return {
    authPrompt, accountName, loggedIn, dashboard, openAlert, alertMessage
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, any>) => {
  return {
    onAlert: () => dispatch(closeAlert()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);