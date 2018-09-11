import * as React from 'react';
import { Button, Menu } from 'semantic-ui-react';

export interface HeaderProps {
  onLock?: () => void;
  onNew?: () => void;
  onShare?: () => void;
}

const TopHeader = ({ onNew, onLock, onShare }: HeaderProps) => {
  return (
    <header>
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
            <Button primary={true} onClick={onShare}>Share</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </header>
  );
}

export default TopHeader;