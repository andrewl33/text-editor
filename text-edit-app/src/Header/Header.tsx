import * as React from 'react';
import { Button, Menu } from 'semantic-ui-react';

class TopHeader extends React.Component {
  public render() {
    return (
      <header>
        <Menu attached={true} inverted={true} primary={true} size='huge'>
          <Menu.Item name='TextEdit' />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button primary={true}>New</Button>
            </Menu.Item>
            <Menu.Item>
              <Button primary={true}>Lock</Button>
            </Menu.Item>
            <Menu.Item>
              <Button primary={true}>Share</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </header>
    );
  }
}

export default TopHeader;