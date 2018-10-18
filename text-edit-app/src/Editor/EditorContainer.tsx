import * as React from 'react';
import { connect } from 'react-redux';
import EditorComponent from './EditorComponent';
import { HeaderComponent } from '../generic/TopBar/HeaderComponent';
import { logIn, AuthAction } from '../Auth/AuthAction';
import { updateCode, changedCode, getText, lockText, newText, authFile, shareLink, closeAlert, EditorAction } from './EditorAction';
import { EditorProps, UserProps, StoreState } from '../types';
import { ThunkDispatch } from 'redux-thunk';

export class EditorContainer extends React.Component<EditorProps & UserProps> {
  public render() {

    const { authPrompt, onAuthAccount, 
      onNew, onLock, onShare, onAlert, 
      accountName, loggedIn, pathname, 
      openAlert, alertMessage, filePrompt, 
      onAuthFile } = this.props;

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
          pageName={"File"}
          prompt={authPrompt ? "Login" : "Private File"}
          onPrompt={authPrompt || filePrompt}
          getPassword={onAuthFile}
          getAccountCredentials={onAuthAccount}
        />
        <EditorComponent {...this.props}/>
      </div>
    );
  }

  public componentDidMount() {
    this.props.onMount();
  }
}

const mapStateToProps = (state: StoreState) => {
  const { accountName, loggedIn, authPrompt } = state.authentication;
  const { codeText, tags, isLoading, isNewPage, hasAuth, isLocked, isSaved, openAlert, alertMessage, filePrompt } = state.editor;
  const { pathname } = state.router.location;
  return {
    accountName, loggedIn, authPrompt,
    codeText, tags, isLoading, isNewPage, hasAuth, isLocked, isSaved, openAlert, alertMessage, filePrompt,
    pathname
  };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, EditorAction | AuthAction>) => {
  return {
    onBatchUpdate: (codeText: string) => dispatch(updateCode(codeText)),
    onCodeChange: () => dispatch(changedCode()),
    onAlert: () => dispatch(closeAlert()),
    onLock: () => dispatch(lockText()),
    onMount: () => dispatch(getText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink()),
    onAuthAccount: (name: string, pass: string) => (logIn(name, pass)),
    onAuthFile: (pass: string) => (authFile(pass))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);