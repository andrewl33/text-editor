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
import {
  EditorContainerProps,
  HeaderProps,
  StoreState,
  UserProps
} from "../types";
import {
  addTag,
  addUserToFile,
  authFile,
  changedCode,
  changeFileName,
  closeAlert,
  EditorAction,
  getText,
  localUpdateCode,
  lockText,
  newText,
  removeTag,
  removeUserFromFile,
  shareLink,
  updateCode
} from "./EditorAction";
import EditorComponent from "./EditorComponent";

/**
 * The type definition here is split due to
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17829
 */
export class EditorContainer extends React.Component<
  EditorContainerProps & UserProps & HeaderProps
> {
  public render() {
    const {
      authPrompt,
      onAuthAccount,
      onNew,
      onLock,
      onShare,
      onAlert,
      accountName,
      loggedIn,
      pathname,
      openAlert,
      alertMessage,
      onClosePrompt,
      filePrompt,
      onAuthFile,
      onLogOut,
      onLogInPrompt,
      codeText,
      tags,
      name,
      createDate,
      users,
      onBatchUpdate,
      onCodeChange,
      onAddTag,
      onRemoveTag,
      onAddUser,
      onRemoveUser,
      onNameChange,
      isLocked,
      onLocalUpdate,
      onHomeClick
    } = this.props;

    return (
      <div style={{ height: "100%" }}>
        <HeaderComponent
          onNew={onNew}
          onLock={onLock}
          onShare={onShare}
          onAlert={onAlert}
          onHomeClick={onHomeClick}
          accountName={accountName}
          loggedIn={loggedIn}
          pathname={pathname}
          isShareable={true}
          openAlert={openAlert}
          alertMessage={alertMessage}
          pageName={"File"}
          prompt={authPrompt ? "Login" : "Private File"} // TODO: handle so render isn't funky
          onPrompt={authPrompt || filePrompt}
          getPassword={onAuthFile}
          getAccountCredentials={onAuthAccount}
          onLogOut={onLogOut}
          onClosePrompt={onClosePrompt}
          onLogInPrompt={onLogInPrompt}
        />
        <EditorComponent
          codeText={codeText}
          tags={tags}
          name={name}
          createDate={createDate}
          users={users}
          onBatchUpdate={onBatchUpdate}
          onCodeChange={onCodeChange}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
          onNameChange={onNameChange}
          onAddUser={onAddUser}
          onRemoveUser={onRemoveUser}
          isLocked={isLocked || filePrompt}
          onLocalUpdate={onLocalUpdate}
        />
      </div>
    );
  }

  public componentDidMount() {
    this.props.onMount();
    if (this.props.authPrompt) {
      this.setState({ prompt: "Login" });
    }
  }
}

const mapStateToProps = (state: StoreState) => {
  const { accountName, loggedIn, authPrompt } = state.authentication;
  const {
    codeText,
    tags,
    isNewPage,
    isLocked,
    isSaved,
    openAlert,
    alertMessage,
    filePrompt,
    name,
    createDate,
    users
  } = state.editor;
  const { pathname } = state.router.location;
  return {
    accountName,
    loggedIn,
    authPrompt,
    codeText,
    tags,
    isNewPage,
    isLocked,
    isSaved,
    openAlert,
    alertMessage,
    filePrompt,
    name,
    createDate,
    users,
    pathname
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    StoreState,
    void,
    EditorAction | AuthAction | RouterAction
  >
) => {
  return {
    onLocalUpdate: (codeText: string) => dispatch(localUpdateCode(codeText)),
    onBatchUpdate: () => dispatch(updateCode()),
    onCodeChange: () => dispatch(changedCode()),
    onAlert: () => dispatch(closeAlert()),
    onLock: (password: string) => dispatch(lockText(password)),
    onMount: () => dispatch(getText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink()),
    onAuthAccount: (name: string, pass: string) => dispatch(logIn(name, pass)),
    onAuthFile: (pass: string) => dispatch(authFile(pass)),
    onAddTag: (tagName: string) => dispatch(addTag(tagName)),
    onRemoveTag: (tagName: string) => dispatch(removeTag(tagName)),
    onNameChange: (name: string) => dispatch(changeFileName(name)),
    onAddUser: (name: string) => dispatch(addUserToFile(name)),
    onRemoveUser: (name: string) => dispatch(removeUserFromFile(name)),
    onLogInPrompt: () => dispatch(logInPrompt()),
    onClosePrompt: () => dispatch(closePrompt()),
    onDashboard: () => dispatch(push("/dashboard")),
    onLogOut: () => dispatch(logOut()),
    onHomeClick: () => dispatch(push("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);
