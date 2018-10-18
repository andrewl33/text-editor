import * as React from 'react';
import { ListComponent } from '../generic/Lists/ListComponent';
import { CollectionComponentProps } from '../types';
// TODO: add styling
export const CollectionComponent = (props: CollectionComponentProps) => {
  return <ListComponent header='Files' {...props} />;
}