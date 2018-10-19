import * as React from 'react';
import { connect } from 'react-redux';
import { push, RouterAction } from 'connected-react-router';
import HomeComponent from './HomeComponent';
import { newText, EditorAction } from '../Editor/EditorAction';
import { newCollection, CollectionAction } from '../Collection/CollectionAction';
import { logIn, AuthAction } from '../Auth/AuthAction';
import { ThunkDispatch } from 'redux-thunk';
import { HomeProps, StoreState } from '../types';

export class HomeContainer extends React.Component<HomeProps> {
  public render() {
    return <HomeComponent {...this.props} />
  }
}

const mapStateToProps = (state: StoreState) => {
  return { loggedIn: state.authentication.loggedIn };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, AuthAction | CollectionAction | EditorAction | RouterAction>) => {
  return {
    onLogin: (name: string, pass: string) => dispatch(logIn(name, pass)),
    onNewFile: () => dispatch(newText()),
    onNewCollection: () => dispatch(newCollection()),
    toDashboard: () => dispatch(push('/dashboard'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);