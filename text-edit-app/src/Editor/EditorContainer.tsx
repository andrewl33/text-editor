import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction, logIn } from "../Auth/AuthAction";
import { HeaderComponent } from "../generic/TopBar/HeaderComponent";
import { EditorProps, StoreState, UserProps } from "../types";
import {
  authFile,
  changedCode,
  closeAlert,
  EditorAction,
  getText,
  lockText,
  newText,
  shareLink,
  updateCode
} from "./EditorAction";
import EditorComponent from "./EditorComponent";

export class EditorContainer extends React.Component<EditorProps & UserProps> {
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
      filePrompt,
      onAuthFile
    } = this.props;

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
          pageName={"File"}
          prompt={authPrompt ? "Login" : "Private File"}
          onPrompt={authPrompt || filePrompt}
          getPassword={onAuthFile}
          getAccountCredentials={onAuthAccount}
        />
        <EditorComponent {...this.props} />
      </div>
    );
  }

  public componentDidMount() {
    this.props.onMount();
  }
}

const mapStateToProps = (state: StoreState) => {
  const { accountName, loggedIn, authPrompt } = state.authentication;
  const {
    codeText,
    tags,
    isLoading,
    isNewPage,
    hasAuth,
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
    isLoading,
    isNewPage,
    hasAuth,
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
  dispatch: ThunkDispatch<StoreState, void, EditorAction | AuthAction>
) => {
  return {
    onBatchUpdate: (codeText: string) => dispatch(updateCode(codeText)),
    onCodeChange: () => dispatch(changedCode()),
    onAlert: () => dispatch(closeAlert()),
    onLock: () => dispatch(lockText()), // TODO:add password
    onMount: () => dispatch(getText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink()),
    onAuthAccount: (name: string, pass: string) => dispatch(logIn(name, pass)),
    onAuthFile: (pass: string) => dispatch(authFile(pass))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);
