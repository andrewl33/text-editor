import * as React from 'react';
import { DashboardProps } from '../types';
import { ListComponent } from '../generic/Lists/ListComponent';


export const DashboardComponent = (props: DashboardProps): React.ReactElement<DashboardProps> => {
  
  return (
    <div>
      {props.collections && <ListComponent header="Collections" items={...props.collections} />}
      {props.files && <ListComponent header="Files" items={...props.files} />}
    </div>
  );
}