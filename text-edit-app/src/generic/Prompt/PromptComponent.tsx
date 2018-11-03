import * as React from "react";
import { Button, Icon, Input, Menu } from "semantic-ui-react";
import { PromptComponentProps } from "../../types";

export class PromptComponent extends React.Component<
  PromptComponentProps,
  { accountName: string; password: string }
> {
  constructor(props: PromptComponentProps) {
    super(props);

    this.state = {
      accountName: "",
      password: ""
    };
  }

  public render() {
    const { prompt, onClosePrompt } = this.props;

    return (
      <div>
        <Menu attached={true} inverted={true} primary="true" size="large">
          <Menu.Item name={prompt}>{prompt}</Menu.Item>
          {(prompt === "Login" || prompt === "Create Account") && (
            <Menu.Item>
              <Input
                placeholder="account name"
                onChange={this.handleAccountChange}
                value={this.state.accountName}
              />
            </Menu.Item>
          )}
          <Menu.Item>
            <Input
              placeholder="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </Menu.Item>
          <Menu.Item>
            <Button primary={true} onClick={this.handleInput}>
              Submit
            </Button>
          </Menu.Item>
          {(prompt === "Login" || prompt === "Create Account") && (
            <Menu.Item position="right">
              <Button primary={true} onClick={onClosePrompt}>
                <Icon name="close" size="large" style={{ margin: 0 }} />
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </div>
    );
  }

  private handleInput = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { getAccountCredentials, getPassword, prompt, lockItem } = this.props;
    const { accountName, password } = this.state;

    if (prompt === "Create Account" || prompt === "Login") {
      if (getAccountCredentials) {
        getAccountCredentials(accountName, password);
      }
    } else if (prompt === "Lock" && lockItem) {
      lockItem(password);
    } else if (getPassword) {
      getPassword(password);
    }
    this.setState({
      accountName: "",
      password: ""
    });
  };

  private handleAccountChange = (e: React.SyntheticEvent) => {
    this.setState({
      accountName: (e.target as HTMLInputElement).value
    });
  };

  private handlePasswordChange = (e: React.SyntheticEvent) => {
    this.setState({
      password: (e.target as HTMLInputElement).value
    });
  };
}
