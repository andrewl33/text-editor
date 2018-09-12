import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import TopHeader from './HeaderComponent';
import { lockText, newText, shareLink, HeaderAction } from './HeaderAction';


class HeaderContainer extends React.Component {
  public render() {
    return <TopHeader />
  }
}

const mapDispatchToProps = (dispatch: Dispatch<HeaderAction>) => {
  return {
    onLock: () => dispatch(lockText()),
    onNew: () => dispatch(newText()),
    onShare: () => dispatch(shareLink())
  }
}

export default connect(mapDispatchToProps)(HeaderContainer);