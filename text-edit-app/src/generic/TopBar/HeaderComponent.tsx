import * as React from "react";
import { Button, Dropdown, Menu, Transition } from "semantic-ui-react";
import { ROOT_URL } from "../../envConstants";
import { HeaderProps } from "../../types";
import AlertComponent from "../Alert/AlertComponent";
import { PromptComponent } from "../Prompt/PromptComponent";

interface HeaderState {
  copy: boolean;
  onLockPrompt: boolean;
}

export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  private urlHolder: React.RefObject<HTMLTextAreaElement>;
  private notificationDuration: number;

  constructor(props: HeaderProps) {
    super(props);

    this.urlHolder = React.createRef();
    this.copyToClipboard = this.copyToClipboard.bind(this);

    this.state = {
      copy: false,
      onLockPrompt: false
    };
  }

  public render() {
    const {
      onNew,
      accountName,
      loggedIn,
      pathname,
      pageName,
      isShareable = false,
      openAlert,
      alertMessage,
      getAccountCredentials,
      getPassword,
      prompt,
      onPrompt,
      onDashboard,
      onLogOut,
      onLogInPrompt,
      onClosePrompt,
      onLock,
      onHomeClick
    } = this.props;

    const alert = alertMessage !== undefined && (
      <AlertComponent open={openAlert} message={alertMessage} />
    );
    const shareButton = isShareable && (
      <Menu.Item>
        <Button primary={true} onClick={this.copyToClipboard}>
          Share
        </Button>
      </Menu.Item>
    );
    const hiddenShare = this.state.copy && (
      <textarea
        className="url-holder"
        value={ROOT_URL + pathname}
        placeholder={"placeholder"}
        readOnly={true}
        ref={this.urlHolder}
      />
    );
    const newButton = onNew && (
      <Menu.Item>
        <Button primary={true} onClick={onNew}>
          New
        </Button>
      </Menu.Item>
    );
    const lockButton = onLock && (
      <Menu.Item>
        <Button primary={true} onClick={this.handleLockRequest}>
          Lock
        </Button>
      </Menu.Item>
    );
    const accountDropDown = (
      <div>
        <Dropdown
          text={loggedIn ? accountName : "Account"}
          icon="user"
          floating={true}
          labeled={true}
          button={true}
          className="icon"
          style={{
            color: "#fff",
            backgroundColor: "#2185d0",
            fontSize: 17
          }}
        >
          {loggedIn ? (
            <Dropdown.Menu>
              <Dropdown.Item onClick={onDashboard}>Dashboard</Dropdown.Item>
              <Dropdown.Item onClick={onLogOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu>
              <Dropdown.Item onClick={onLogInPrompt}>Log in</Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </div>
    );

    return (
      <header>
        {alert}
        <Menu attached={true} inverted={true} primary="true" size="huge">
          <Menu.Item name="TextEdit" onClick={onHomeClick} />
          <Menu.Item name={pageName} />
          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary={true} onClick={this.props.toGradingPage}>
                Grading
              </Button>
            </Menu.Item>
            {newButton}
            {lockButton}
            {shareButton}
            <Menu.Item>{accountDropDown}</Menu.Item>
          </Menu.Menu>
        </Menu>
        <Transition
          animation="fade down"
          unmountOnHide={true}
          visible={onPrompt || this.state.onLockPrompt}
        >
          <PromptComponent
            getAccountCredentials={getAccountCredentials}
            getPassword={getPassword}
            prompt={this.state.onLockPrompt ? "Lock" : prompt}
            onClosePrompt={onClosePrompt}
            lockItem={this.handleLockSubmit}
          />
        </Transition>
        {hiddenShare}
      </header>
    );
  }

  public componentDidUpdate = (): void => {
    // copy to clipboard
    // reset copy state
    // if (this.props.isShareable && this.state.copy) {
    if (true && this.state.copy) {
      this.urlHolder.current!.select();
      window.document.execCommand("copy");
      this.setState({ copy: false });
    }

    if (this.props.openAlert) {
      clearTimeout(this.notificationDuration);
      this.notificationDuration = window.setTimeout(this.props.onAlert, 1500);
    }
  };

  private copyToClipboard = (): void => {
    // shows the textarea so it is selectable
    this.setState({ copy: true });
    // the state is set back to false in componentDidUpdate()
  };

  private handleLockRequest = (): void => {
    this.setState({ onLockPrompt: true });
  };

  private handleLockSubmit = (password: string) => {
    this.setState({ onLockPrompt: false });
    if (this.props.onLock) {
      this.props.onLock(password);
    }
  };
}
