import * as React from 'react';
import { connect } from 'react-redux';
import EditorComponent from './EditorComponent';
import HeaderComponent from './HeaderComponent';
import { updateCode, changedCode, getText, lockText, newText, shareLink, closeAlert, EditorAction } from './EditorAction';
import { EditorProps, StoreState } from '../types';
import { ThunkDispatch } from 'redux-thunk';

export class EditorContainer extends React.Component<EditorProps> {
  public render() {
    return (
      <div>
        <HeaderComponent {...this.props}/>
        <EditorComponent {...this.props}/>
      </div>
    );
  }

  public componentDidMount() {
    this.props.onMount();
  }
}

const mapStateToProps = (state: StoreState) => {
  const { codeText, isLoading, isNewPage, hasAuth, isLocked, isSaved, openAlert, alertMessage } = state.editor;
  const { pathname } = state.router.location;
  return {
    codeText, isLoading, isNewPage, hasAuth, isLocked, isSaved, openAlert, alertMessage, pathname
  };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, EditorAction>) => {
  return {
    onBatchUpdate: (codeText: string) => dispatch(updateCode(codeText)),
    onCodeChange: () => dispatch(changedCode()),
    onAlert: () => dispatch(closeAlert()),
    onLock: () => dispatch(lockText()),
    onMount: () => dispatch(getText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);