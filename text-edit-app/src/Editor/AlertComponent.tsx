import * as React from 'react';
import { Header, Segment, TransitionablePortal } from 'semantic-ui-react';
/**
 * This component receives a alert string
 */

interface AlertProps {
  message: string;
  open: boolean;
}


const AlertComponent = (props: AlertProps) => {
  return (
    <TransitionablePortal open={props.open} animation={{ animation: 'fade down' }}>
      <Segment style={{ width:'40%', left: '30%', position: 'fixed', top: '10%', zIndex: 1000 }}>
        <Header>{props.message}</Header>
      </Segment>
    </TransitionablePortal>
  )
}

export default AlertComponent;