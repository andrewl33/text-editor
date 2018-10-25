import { push, RouterAction } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { AuthAction, logIn, logInPrompt, logOut } from "../Auth/AuthAction";
import { HeaderComponent } from "../generic/TopBar/HeaderComponent";
import { StoreState } from "../types";
import {
  changeCollectionName,
  closeAlert,
  CollectionAction,
  getCollectionFiles,
  lockCollection,
  newCollection,
  shareLink
} from "./CollectionAction";
import { CollectionComponent } from "./CollectionComponent";

export class CollectionContainer extends React.Component<any> {
  public render() {
    const {
      accountName,
      loggedIn,
      openAlert,
      alertMessage,
      authPrompt,
      pathname,
      onNew,
      onLock,
      onShare,
      onAlert,
      name,
      createDate,
      users,
      isLocked,
      collectionPrompt,
      onNameChange,
      onDashboard,
      onLogInPrompt,
      onLogOut
    } = this.props;

    const files = [
      {
        uuid: "1",
        name: "Hello World",
        tags: ["Snippet", "Rust", "Mission Critical"],
        date: "1-1-1"
      },
      {
        uuid: "2",
        name: "test",
        tags: ["css", "firefox", "mobile"],
        date: "1-1-1"
      },
      {
        uuid: "3",
        name: "",
        tags: ["test", "Google", "jimmy"],
        date: "1-1-1"
      }
    ];

    return (
      <div style={{ height: "100%" }}>
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
          pageName={"Collection"}
          onPrompt={authPrompt || collectionPrompt}
          onLogInPrompt={onLogInPrompt}
          onDashboard={onDashboard}
          onLogOut={onLogOut}
        />
        <CollectionComponent
          items={files}
          createDate={createDate}
          name={name}
          users={users}
          isLocked={isLocked}
          onNameChange={onNameChange}
        />
      </div>
    );
  }

  public componentDidMount() {
    this.props.onMount();
  }
}

const mapStateToProps = (state: StoreState) => {
  const {
    openAlert,
    alertMessage,
    items,
    name,
    createDate,
    users,
    isLocked,
    collectionPrompt
  } = state.collection;
  const { accountName, loggedIn, authPrompt } = state.authentication;
  const { pathname } = state.router.location;

  return {
    accountName,
    loggedIn,
    openAlert,
    authPrompt,
    alertMessage,
    items,
    name,
    createDate,
    users,
    pathname,
    isLocked,
    collectionPrompt
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    StoreState,
    void,
    AuthAction | CollectionAction | RouterAction
  >
) => {
  return {
    onNew: () => dispatch(newCollection()),
    onLock: (password: string) => dispatch(lockCollection(password)),
    onShare: () => dispatch(shareLink()),
    onAlert: () => dispatch(closeAlert()),
    onMount: () => dispatch(getCollectionFiles()),
    onAuthAccount: (name: string, pass: string) => dispatch(logIn(name, pass)),
    // TODO: onAuthCollection: (pass: string) => dispatch(authCollection(pass)),
    onNameChange: (name: string) => dispatch(changeCollectionName(name)),
    onDashboard: () => dispatch(push("/dashboard")),
    onLogInPrompt: () => dispatch(logInPrompt()),
    onLogOut: () => dispatch(logOut())
  };
  // TODO: auth
  // TODO: delete
  // TODO: addfile
  // TODO: remove file
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionContainer);
