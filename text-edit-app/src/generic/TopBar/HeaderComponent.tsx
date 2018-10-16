import * as React from 'react';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import AlertComponent from '../Alert/AlertComponent';
import { EditorProps } from '../../types';
import { RefObject } from 'react-sane-contenteditable';
import { ROOT_URL } from '../../envConstants';

interface HeaderState {
  copy: boolean;
}

export interface HeaderProps {
  onNew?: () => {};
  onLock?: () => {};
  onShare?: () => {};
  onAlert: () => {};
  accountName?: string;
  loggedIn: boolean;
  pathname: string;
  isShareable?: boolean;
  openAlert: boolean;
  alertMessage?: string;
  pageName: string;
}


export class HeaderComponent extends React.Component<HeaderProps | EditorProps, HeaderState> {
  
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

    // const { onNew, onLock, accountName, loggedIn, pathname, isShareable = false, openAlert, alertMessage, pageName } = this.props;
    const { onNew, onLock, pathname, openAlert, alertMessage } = this.props;
    
    const alert = alertMessage !== undefined && <AlertComponent open={openAlert} message={alertMessage} />;
    // const shareButton = isShareable && <Button primary={true} onClick={this.copyToClipboard}>Share</Button>;
    const shareButton = true && <Button primary={true} onClick={this.copyToClipboard}>Share</Button>;
    const hiddenShare = this.state.copy && <textarea className="url-holder" value={ROOT_URL+pathname} placeholder={"placeholder"} readOnly={true} ref={this.urlHolder}/>;
    const newButton = onNew && <Menu.Item><Button primary={true} onClick={onNew}>New</Button></Menu.Item>;
    const lockButton = onLock && <Menu.Item><Button primary={true} onClick={onLock}>Lock</Button></Menu.Item>;
    // const accountDropDown = (
    //   <Dropdown text={loggedIn ? accountName : ''} icon='user' floating={true} labeled={true} button={true} className='account-btn'>

    //     {loggedIn
    //       ? <Dropdown.Menu>
    //           <Dropdown.Item>Dashboard</Dropdown.Item>
    //           <Dropdown.Item>Log out</Dropdown.Item>
    //         </Dropdown.Menu> 
    //       : <Dropdown.Menu>
    //           <Dropdown.Item>Log in</Dropdown.Item>
    //         </Dropdown.Menu>
    //     }

    //   </Dropdown>
    // );

    const accountDropDown = (
      <Dropdown icon='user' labeled={true} floating={true} className='account-btn'>
        {true
          ? <Dropdown.Menu>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu> 
          : <Dropdown.Menu>
              <Dropdown.Item>Log in</Dropdown.Item>
            </Dropdown.Menu>
        }
      </Dropdown>
    );

    return (
      <header>
        {alert}
        <Menu attached={true} inverted={true} primary="true" size='huge'>
          <Menu.Item name='TextEdit' />
          <Menu.Item name={"Placeholder"} />
          <Menu.Menu position='right'>
            {newButton}
            {lockButton}
            <Menu.Item>
              {shareButton}
            </Menu.Item>
            <Menu.Item>
              {accountDropDown}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {hiddenShare}
        
      </header>
    );
  }


  public componentDidUpdate() {
    // copy to clipboard
    // reset copy state
    // if (this.props.isShareable && this.state.copy) {
    if (true && this.state.copy) {
      this.urlHolder.current.select();
      window.document.execCommand('copy');
      this.setState({copy: false});
      // this.props.onShare();
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