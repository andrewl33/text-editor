import * as React from 'react';
import { List } from 'semantic-ui-react';
import { ListProps } from '../../types';


export const ListComponent = (props: ListProps): React.ReactElement<ListProps> => {
  
  const listItems = props.items && props.items.map((item, index) => {
    return (
      <List.Item key={index}>
        {item.uuid}: {item.tags.map(tag => tag)} : {item.date}
      </List.Item>
    );
  });

  return (
    <List celled={true}>
      <List.Item>
        <List.Header>{props.header}</List.Header>
      </List.Item>
      {listItems}
    </List>
  );
}