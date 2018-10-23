import * as React from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
import gitLogo from "../github.png";
import { HomeProps } from "../types";

// TODO: learn how to debounce with throttle
// Right now, throttle is always false

interface HomeComponentState {
  throttle: boolean;
  textLoading: boolean;
  collectionLoading: boolean;
  logInLoading: boolean;
  accountName: string;
  password: string;
}

export default class HomeComponent extends React.Component<
  HomeProps,
  HomeComponentState
> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      throttle: false,
      textLoading: false,
      collectionLoading: false,
      logInLoading: false,
      accountName: "",
      password: ""
    };
  }

  public render() {
    const {
      textLoading,
      collectionLoading,
      logInLoading,
      accountName,
      password
    } = this.state;

    const loggedInComponent = this.props.loggedIn ? (
      <Button
        fluid={true}
        primary={true}
        size="huge"
        onClick={this.props.toDashboard}
      >
        Go To Dashboard
      </Button>
    ) : (
      <Form inverted={true}>
        <Form.Field>
          <label>Account Name</label>
          <input
            placeholder="Account Name"
            value={accountName}
            onChange={this.handleAccountNameChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </Form.Field>
        <br />
        <Button
          fluid={true}
          primary={true}
          type="submit"
          size="huge"
          onClick={this.onLogIn}
        >
          <Icon
            name={!logInLoading ? "user outline" : "circle notch"}
            loading={logInLoading}
          />
          Log in
        </Button>
      </Form>
    );

    return (
      <Container style={{ height: "100%" }}>
        <Grid
          textAlign="center"
          verticalAlign="middle"
          centered={true}
          style={{ height: "100%" }}
        >
          <Grid.Column
            textAlign="center"
            centered={true}
            style={{ maxWidth: 450 }}
          >
            <Header as="h1" content="TextEdit" inverted={true} />
            <Header
              inverted={true}
              as="h2"
              content="A way to share text files, that may be highlighted one day."
            />
            <Segment
              inverted={true}
              textAlign="center"
              style={{ maxWidth: 450 }}
              padded="very"
            >
              <Button
                fluid={true}
                primary={true}
                size="huge"
                onClick={this.newFile}
              >
                <Icon
                  name={!textLoading ? "file outline" : "circle notch"}
                  loading={textLoading}
                />
                New File
              </Button>
              <br />
              <Button
                fluid={true}
                primary={true}
                size="huge"
                onClick={this.newCollection}
              >
                <Icon
                  name={!collectionLoading ? "folder outline" : "circle notch"}
                  loading={collectionLoading}
                />
                New Collection
              </Button>
              <br />
              {loggedInComponent}
            </Segment>
            <a href="https://github.com/andrewl33/text-editor">
              <img src={gitLogo} alt="github" />
            </a>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

  private newFile = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!this.state.textLoading && !this.state.throttle) {
      this.setState({ textLoading: true, throttle: false });
      this.props.onNewFile();
    }
  };

  private newCollection = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!this.state.collectionLoading && !this.state.throttle) {
      this.setState({ collectionLoading: true, throttle: false });
      this.props.onNewFile();
    }
  };

  private onLogIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!this.state.logInLoading && !this.state.throttle) {
      this.setState({ logInLoading: true, throttle: false });
      this.props.onLogin(this.state.accountName, this.state.password);
    }
  };

  private handleAccountNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ accountName: e.target.value });
  };

  private handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };
}
