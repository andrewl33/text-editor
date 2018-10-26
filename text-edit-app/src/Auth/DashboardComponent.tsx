import * as React from "react";
import { ListComponent } from "../generic/Lists/ListComponent";
import { DashboardProps } from "../types";

export const DashboardComponent = (
  props: DashboardProps
): React.ReactElement<DashboardProps> => {
  return (
    <div>
      {props.collections &&
        props.onCollectionClick && (
          <ListComponent
            header="Collections"
            items={...props.collections}
            onClickToPage={props.onCollectionClick}
          />
        )}
      {props.files && (
        <ListComponent
          header="Files"
          items={...props.files}
          onClickToPage={props.onFileClick}
        />
      )}
    </div>
  );
};
