import { push, RouterAction } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import {
  AuthAction,
  closePrompt,
  logIn,
  logInPrompt,
  logOut
} from "../Auth/AuthAction";
import { HeaderComponent } from "../generic/TopBar/HeaderComponent";
import { CollectionContainerProps, HeaderProps, StoreState } from "../types";
import {
  addFileToCollection,
  addUserToCollection,
  authCollection,
  changeCollectionName,
  closeAlert,
  CollectionAction,
  getCollectionFiles,
  lockCollection,
  newCollection,
  removeFileFromCollection,
  removeUserFromCollection,
  shareLink
} from "./CollectionAction";
import { CollectionComponent } from "./CollectionComponent";

export class CollectionContainer extends React.Component<
  CollectionContainerProps & HeaderProps
> {
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
      onLogOut,
      onAddFile,
      onRemoveFile,
      onAddUser,
      onRemoveUser,
      onAuthCollection,
      onAuthAccount,
      onClosePrompt
    } = this.props;

    const files = [
      {
        id: "1",
        name: "Hello World",
        tags: ["Snippet", "Rust", "Mission Critical"],
        date: "1-1-1"
      },
      {
        id: "2",
        name: "test",
        tags: ["css", "firefox", "mobile"],
        date: "1-1-1"
      },
      {
        id: "3",
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
          prompt={authPrompt ? "Login" : "Private File"}
          getAccountCredentials={onAuthAccount}
          getPassword={onAuthCollection}
          onPrompt={authPrompt || collectionPrompt}
          onLogInPrompt={onLogInPrompt}
          onDashboard={onDashboard}
          onLogOut={onLogOut}
          onClosePrompt={onClosePrompt}
        />
        <CollectionComponent
          items={files}
          createDate={createDate}
          name={name}
          users={users}
          isLocked={isLocked}
          onNameChange={onNameChange}
          onAddFile={onAddFile}
          onRemoveFile={onRemoveFile}
          onAddUser={onAddUser}
          onRemoveUser={onRemoveUser}
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
    onAddFile: (fileId: string) => dispatch(addFileToCollection(fileId)),
    onRemoveFile: (fileId: string) =>
      dispatch(removeFileFromCollection(fileId)),
    onAddUser: (accountName: string) =>
      dispatch(addUserToCollection(accountName)),
    onRemoveUser: (accountName: string) =>
      dispatch(removeUserFromCollection(accountName)),
    onAuthCollection: (password: string) => dispatch(authCollection(password)),
    onAuthAccount: (name: string, pass: string) => dispatch(logIn(name, pass)),
    // TODO: onAuthCollection: (pass: string) => dispatch(authCollection(pass)),
    onNameChange: (name: string) => dispatch(changeCollectionName(name)),
    onDashboard: () => dispatch(push("/dashboard")),
    onLogInPrompt: () => dispatch(logInPrompt()),
    onLogOut: () => dispatch(logOut()),
    onClosePrompt: () => dispatch(closePrompt())
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
