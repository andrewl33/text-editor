import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { HeaderComponent } from '../generic/TopBar/HeaderComponent';
import { CollectionComponent } from './CollectionComponent';
import { logIn, AuthAction } from '../Auth/AuthAction';
import { CollectionAction, getCollectionFiles, lockCollection, newCollection, shareLink, closeAlert } from './CollectionAction';
import { StoreState } from '../types';


export class CollectionContainer extends React.Component<any> {
  public render() {

    const { accountName, loggedIn, openAlert, alertMessage, authPrompt,
      pathname, onNew, onLock, onShare, onAlert, 
      name, createDate, users, isLocked, collectionPrompt } = this.props;
    
      const files = [
        {
          uuid: '1',
          name: "Hello World",
          tags: ["Snippet", "Rust", "Mission Critical"],
          date: "1-1-1"
        },
        {
          uuid: '2',
          name: 'test',
          tags: ["css", "firefox", "mobile"],
          date: "1-1-1"
        },
        {
          uuid: '3',
          name: '',
          tags: ["test", "Google", "jimmy"],
          date: "1-1-1"
        },
      ]

    return (
      <div style={{ height: '100%' }}>
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
          onPrompt={authPrompt || collectionPrompt}
        />
        <CollectionComponent
          items={files}
          createDate={createDate}
          name={name}
          users={users}
          isLocked={isLocked}
        />
      </div>

    );
  }

  public componentDidMount() {
    this.props.onMount();
  }
}

const mapStateToProps = (state: StoreState) => {
  const { openAlert, alertMessage, items, 
    name, createDate, users, isLocked, collectionPrompt } = state.collection;
  const { accountName, loggedIn, authPrompt } = state.authentication;
  const { pathname } = state.router.location;

  return {
    accountName, loggedIn, openAlert, authPrompt,
    alertMessage, items, name, createDate, 
    users, pathname, isLocked, collectionPrompt
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, AuthAction | CollectionAction>) => {
  return {
    onNew: () => dispatch(newCollection()),
    onLock: (password: string) => dispatch(lockCollection(password)),
    onShare: () => dispatch(shareLink()),
    onAlert: () => dispatch(closeAlert()),
    onMount: () => dispatch(getCollectionFiles()),
    onAuthAccount: (name: string, pass: string) => dispatch(logIn(name, pass)),
    // TODO: onAuthCollection: (pass: string) => dispatch(authCollection(pass)),

  }
  // TODO: auth
  // TODO: delete
  // TODO: addfile
  // TODO: remove file
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);