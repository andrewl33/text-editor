import * as React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import AlertComponent from './AlertComponent';
import { EditorProps } from '../types';
import { RefObject } from 'react-sane-contenteditable';
import { ROOT_URL } from '../envConstants';

interface HeaderState {
  copy: boolean;
}


export class HeaderComponent extends React.Component<EditorProps, HeaderState> {
  
  private urlHolder: RefObject<any>;
  private notificationDuration: number;
 
  constructor(props: EditorProps) {
    super(props);

    this.urlHolder = React.createRef();
    this.copyToClipboard = this.copyToClipboard.bind(this);

    this.state = {
      copy: false
    }
  }

  public render() {

    const { onNew, onLock, pathname, openAlert, alertMessage } = this.props;
    
    return (
      <header>
        <AlertComponent open={openAlert} message={alertMessage} />
        <Menu attached={true} inverted={true} primary="true" size='huge'>
          <Menu.Item name='TextEdit' />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button primary={true} onClick={onNew}>New</Button>
            </Menu.Item>
            <Menu.Item>
              <Button primary={true} onClick={onLock}>Lock</Button>
            </Menu.Item>
            <Menu.Item>
              <Button primary={true} onClick={this.copyToClipboard}>Share</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {this.state.copy ? 
          (<textarea className="url-holder" value={ROOT_URL+pathname} placeholder={"placeholder"} readOnly={true} ref={this.urlHolder}/>)
        : ''}
        
      </header>
    );
  }


  public componentDidUpdate() {
    // copy to clipboard
    // reset copy state
    if (this.state.copy) {
      this.urlHolder.current.select();
      window.document.execCommand('copy');
      this.setState({copy: false});
      this.props.onShare();
    }

    if (this.props.openAlert) {
      clearTimeout(this.notificationDuration);
      this.notificationDuration = window.setTimeout(this.props.onAlert, 1500);
    }
  }

  private copyToClipboard(): void {
    // shows the textarea so it is selectable
    this.setState({ copy: true });
    // the state is set back to false in componentDidUpdate()
  }
}

export default HeaderComponent;