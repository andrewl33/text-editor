import * as React from 'react';
import { Button, Dropdown, Icon, Menu, Transition } from 'semantic-ui-react';
import AlertComponent from '../Alert/AlertComponent';
import { HeaderProps } from '../../types';
import { RefObject } from 'react-sane-contenteditable';
import { ROOT_URL } from '../../envConstants';
import { PromptComponent } from '../Prompt/PromptComponent';

interface HeaderState {
  copy: boolean;
}

export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  
  private urlHolder: RefObject<any>;
  private notificationDuration: number;
 
  constructor(props: HeaderProps) {
    super(props);

    this.urlHolder = React.createRef();
    this.copyToClipboard = this.copyToClipboard.bind(this);

    this.state = {
      copy: false
    }
  }

  public render() {

    const { 
      onNew, onLock, accountName, loggedIn, pathname, pageName,
      isShareable = false, 
      openAlert, alertMessage,
      getAccountCredentials, getPassword, prompt, onPrompt
    } = this.props;
    
    const alert = alertMessage !== undefined && <AlertComponent open={openAlert} message={alertMessage} />;
    const shareButton = isShareable && <Menu.Item><Button primary={true} onClick={this.copyToClipboard}>Share</Button></Menu.Item>;
    const hiddenShare = this.state.copy && <textarea className="url-holder" value={ROOT_URL+pathname} placeholder={"placeholder"} readOnly={true} ref={this.urlHolder}/>;
    const newButton = onNew && <Menu.Item><Button primary={true} onClick={onNew}>New</Button></Menu.Item>;
    const lockButton = onLock && <Menu.Item><Button primary={true} onClick={onLock}>Lock</Button></Menu.Item>;
    const accountDropDown = (
      <div>
        <Icon name='user' inverted={true} />
        <Dropdown text={loggedIn ? accountName : ''}  floating={true} labeled={true} button={true} className='account-btn'>
          {loggedIn
            ? <Dropdown.Menu>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Log out</Dropdown.Item>
              </Dropdown.Menu> 
            : <Dropdown.Menu>
                <Dropdown.Item>Log in</Dropdown.Item>
              </Dropdown.Menu>
          }
        </Dropdown>
      </div>
    );

    return (
      <header>
        {alert}
        <Menu attached={true} inverted={true} primary="true" size='huge'>
          <Menu.Item name='TextEdit' />
          <Menu.Item name={pageName} />
          <Menu.Menu position='right'>
            {newButton}
            {lockButton}
            {shareButton}
            <Menu.Item>
              {accountDropDown}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Transition animation="fade down" unmountOnHide={true} visible={onPrompt}>
          <PromptComponent
            getAccountCredentials={getAccountCredentials}
            getPassword={getPassword}
            prompt={prompt}
          />
        </Transition>
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