import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import EditorComponent from './EditorComponent';
import { updateCode, changeCode, EditorAction } from './EditorAction';
import * as types from '../types';

class EditorContainer extends React.Component {
  public render() {
    return <EditorComponent />
  }
}

const mapStateToProps = (state: types.EditorStoreState) => {
  const { codeText } = state;

  return {
    codeText
  };
}

const mapDispatchToProps = (dispatch: Dispatch<EditorAction>) => {
  return {
    onBatchUpdate: () => dispatch(updateCode()),
    onCodeChange: () => dispatch(changeCode())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);