import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { HeaderComponent } from "../generic/TopBar/HeaderComponent";
import { StoreState } from "../types";
import { closeAlert, logInPrompt, logOut } from "./AuthAction";
import { DashboardComponent } from "./DashboardComponent";

export class DashboardContainer extends React.Component<any> {
  public render() {
    // const { accountName, authPrompt, loggedIn, dashboard, openAlert, alertMessage, onAlert } = this.props;
    const {
      accountName,
      authPrompt,
      loggedIn,
      openAlert,
      alertMessage,
      onAlert,
      onLogInPrompt,
      onLogOut
    } = this.props;
    const header = (
      <HeaderComponent
        accountName={accountName}
        loggedIn={loggedIn}
        isShareable={false}
        openAlert={openAlert}
        alertMessage={alertMessage}
        pageName={"Dashboard"}
        onAlert={onAlert}
        onPrompt={authPrompt}
        onLogInPrompt={onLogInPrompt}
        onLogOut={onLogOut}
      />
    );

    // if (!loggedIn) {
    //   return (
    //     <div>
    //       {header}
    //       Not logged in!
    //     </div>
    //   );
    // } else {
    //   const { collections, files } = dashboard;
    //   return (
    //     <div>
    //       {header}
    //       <DashboardComponent
    //         files={files}
    //         collections={collections}
    //       />
    //     </div>

    //   );
    // }

    const collections = [
      {
        id: "1",
        name: "My best File",
        date: "1-1-1"
      },
      {
        id: "1",
        name: "test",
        date: "1-1-1"
      },
      {
        id: "1",
        name: "",
        date: "1-1-1"
      },
      {
        id: "1",
        name: "wow",
        date: "1-1-1"
      },
      {
        id: "1",
        name: "hello",
        date: "1-1-1"
      },
      {
        id: "1",
        name: "world",
        date: "1-1-1"
      }
    ];

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
      <div>
        {header}
        <DashboardComponent files={files} collections={collections} />
      </div>
    );
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

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, any>) => {
  return {
    onAlert: () => dispatch(closeAlert()),
    onLogInPrompt: () => dispatch(logInPrompt()),
    onLogOut: () => dispatch(logOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
