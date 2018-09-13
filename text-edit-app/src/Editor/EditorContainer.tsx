import * as React from 'react';
import { connect } from 'react-redux';
import EditorComponent from './EditorComponent';
import HeaderComponent from './HeaderComponent';
import { updateCode, changedCode, lockText, newText, shareLink, EditorAction } from './EditorAction';
import { EditorStoreState, EditorProps, StoreState } from '../types';
import { ThunkDispatch } from 'redux-thunk';

class EditorContainer extends React.Component<EditorProps> {
  public render() {
    return (
      <div>
        <HeaderComponent {...this.props}/>
        <EditorComponent {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state: EditorStoreState) => {
  const { codeText, isLoading, isNewPage, url, hasAuth, isLocked, isSaved } = state;
  return {
    codeText, isLoading, isNewPage, url, hasAuth, isLocked, isSaved
  };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, EditorAction>) => {
  return {
    onBatchUpdate: (codeText: string) => dispatch(updateCode(codeText)),
    onCodeChange: () => dispatch(changedCode()),
    onLock: () => dispatch(lockText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);