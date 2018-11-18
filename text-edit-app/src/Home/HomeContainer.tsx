import { push, RouterAction } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AuthAction, createAccount, logIn } from "../Auth/AuthAction";
import {
  CollectionAction,
  newCollection
} from "../Collection/CollectionAction";
import { EditorAction, newText } from "../Editor/EditorAction";
import { HomeProps, StoreState } from "../types";
import HomeComponent from "./HomeComponent";

export class HomeContainer extends React.Component<HomeProps> {
  public render() {
    return <HomeComponent {...this.props} />;
  }
}

const mapStateToProps = (state: StoreState) => {
  return { loggedIn: state.authentication.loggedIn };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    StoreState,
    void,
    AuthAction | CollectionAction | EditorAction | RouterAction
  >
) => {
  return {
    onLogin: (name: string, pass: string) => dispatch(logIn(name, pass)),
    onNewFile: () => dispatch(newText()),
    onNewCollection: () => dispatch(newCollection()),
    toDashboard: () => dispatch(push("/dashboard")),
    onCreateAccount: (name: string, pass: string) =>
      dispatch(createAccount(name, pass)),
    toGradingPage: () => dispatch(push('/grading'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
