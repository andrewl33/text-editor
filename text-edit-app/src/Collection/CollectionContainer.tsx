import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { HeaderComponent } from '../generic/TopBar/HeaderComponent';
import { CollectionComponent } from './CollectionComponent';
import { CollectionAction, getCollectionFiles, lockCollection, newCollection, shareLink, closeAlert } from './CollectionAction';
import { StoreState } from '../types';


export class CollectionContainer extends React.Component<any> {
  public render() {

    const { accountName, loggedIn, openAlert, alertMessage, items, pathname, onNew, onLock, onShare, onAlert } = this.props;

    return (
      <div>
        <HeaderComponent 
          onNew={onNew}
          onLock={onLock}
          onShare={onShare}
          onAlert={onAlert}
          accountName={accountName}
          loggedIn={loggedIn}
          pathname={pathname}
          isShareable={true}
          openAlert={openAlert}
          alertMessage={alertMessage}
          pageName={'Collection'}
        />
        <CollectionComponent
          items={items}
        />
      </div>

    );
  }

  public componentDidMount() {
    this.props.onMount();
  }
}

const mapStateToProps = (state: StoreState) => {
  const { openAlert, alertMessage, items } = state.collection;
  const { accountName, loggedIn } = {accountName:"account name", loggedIn: true};
  const { pathname } = state.router.location;

  return {
    accountName, loggedIn, openAlert, alertMessage, items, pathname
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, CollectionAction>) => {
  return {
    onNew: () => dispatch(newCollection()),
    onLock: (password: string) => dispatch(lockCollection(password)),
    onShare: () => dispatch(shareLink()),
    onAlert: () => dispatch(closeAlert()),
    onMount: () => dispatch(getCollectionFiles())
  }
  // TODO: auth
  // TODO: delete
  // TODO: addfile
  // TODO: remove file
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);