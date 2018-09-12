import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import EditorComponent from './EditorComponent';
import HeaderComponent from './HeaderComponent';
import { updateCode, changeCode, lockText, newText, shareLink, EditorAction } from './EditorAction';
import * as types from '../types';


class EditorContainer extends React.Component<types.EditorStoreState> {
  public render() {
    return (
      <div>
        <HeaderComponent {...this.props}/>
        <EditorComponent {...this.props}/>
      </div>

    );
  }
}

const mapStateToProps = (state: types.EditorStoreState) => {
  const { codeText, isLoading, isNewPage, url, hasAuth, isLocked, isSaved } = state;
  return {
    codeText, isLoading, isNewPage, url, hasAuth, isLocked, isSaved
  };
}

const mapDispatchToProps = (dispatch: Dispatch<EditorAction>) => {
  return {
    onBatchUpdate: () => dispatch(updateCode()),
    onCodeChange: () => dispatch(changeCode()),
    onLock: () => dispatch(lockText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);