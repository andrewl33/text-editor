import * as React from 'react';
import { connect } from 'react-redux';
import EditorComponent from './EditorComponent';
import HeaderComponent from './HeaderComponent';
import { updateCode, changedCode, getText, lockText, newText, shareLink, EditorAction } from './EditorAction';
import { EditorProps, StoreState } from '../types';
import { ThunkDispatch } from 'redux-thunk';

class EditorContainer extends React.Component<EditorProps> {
  public render() {
    if (this.props.isLoading) {
      return null;
    } else {
      return (
        <div>
          <HeaderComponent {...this.props}/>
          <EditorComponent {...this.props}/>
        </div>
      );
    }

  }

  public componentDidMount() {
    this.props.onMount();
  }
}

const mapStateToProps = (state: StoreState) => {
  const { codeText, isLoading, isNewPage, url, hasAuth, isLocked, isSaved } = state.editor;
  return {
    codeText, isLoading, isNewPage, url, hasAuth, isLocked, isSaved
  };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, EditorAction>) => {
  return {
    onBatchUpdate: (codeText: string) => dispatch(updateCode(codeText)),
    onCodeChange: () => dispatch(changedCode()),
    onLock: () => dispatch(lockText()),
    onMount: () => dispatch(getText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);