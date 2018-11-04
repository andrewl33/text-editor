import { push, RouterAction } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { HeaderComponent } from "../generic/TopBar/HeaderComponent";
import { DashboardContainerProps, HeaderProps, StoreState } from "../types";
import {
  AuthAction,
  closeAlert,
  closePrompt,
  logIn,
  logInPrompt,
  logOut
} from "./AuthAction";
import { DashboardComponent } from "./DashboardComponent";

export class DashboardContainer extends React.Component<
  DashboardContainerProps & HeaderProps
> {
  public render() {
    const {
      accountName,
      authPrompt,
      loggedIn,
      openAlert,
      alertMessage,
      onAlert,
      dashboard,
      onLogInPrompt,
      onLogOut,
      onFileClick,
      onCollectionClick,
      onAuthAccount,
      onClosePrompt,
      onHomeClick
    } = this.props;
    const header = (
      <HeaderComponent
        accountName={accountName}
        onHomeClick={onHomeClick}
        loggedIn={loggedIn}
        isShareable={false}
        openAlert={openAlert}
        alertMessage={alertMessage}
        pageName={"Dashboard"}
        onAlert={onAlert}
        onPrompt={authPrompt}
        onLogInPrompt={onLogInPrompt}
        onLogOut={onLogOut}
        prompt={"Login"}
        getAccountCredentials={onAuthAccount}
        onClosePrompt={onClosePrompt}
      />
    );

    if (!loggedIn || !dashboard) {
      return (
        <div>
          {header}
          <h1 style={{ color: "rgba(255,255,255,.9)" }}>Not logged in!</h1>
        </div>
      );
    } else {
      return (
        <div>
          {header}
          <DashboardComponent
            dashboard={dashboard}
            onFileClick={onFileClick}
            onCollectionClick={onCollectionClick}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state: StoreState) => {
  const {
    authPrompt,
    accountName,
    loggedIn,
    dashboard,
    openAlert,
    alertMessage
  } = state.authentication;

  return {
    authPrompt,
    accountName,
    loggedIn,
    dashboard,
    openAlert,
    alertMessage
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, void, AuthAction | RouterAction>
) => {
  return {
    onAlert: () => dispatch(closeAlert()),
    onLogInPrompt: () => dispatch(logInPrompt()),
    onLogOut: () => dispatch(logOut()),
    onClosePrompt: () => dispatch(closePrompt()),
    onAuthAccount: (name: string, pass: string) => dispatch(logIn(name, pass)),
    onCollectionClick: (id: string) => dispatch(push(`/collections/${id}`)),
    onFileClick: (id: string) => dispatch(push(`/files/${id}`)),
    onHomeClick: () => dispatch(push("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
