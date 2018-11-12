import * as React from "react";
import { ListComponent } from "../generic/Lists/ListComponent";
import { DashboardComponentProps } from "../types";

export const DashboardComponent = (
  props: DashboardComponentProps
): React.ReactElement<DashboardComponentProps> => {
  return (
    <div>
      {props.dashboard!.collections && props.onCollectionClick && (
        <ListComponent
          header="Collections"
          items={...props.dashboard!.collections}
          onClickToPage={props.onCollectionClick}
        />
      )}
      {props.dashboard!.files && (
        <ListComponent
          header="Files"
          items={...props.dashboard!.files}
          onClickToPage={props.onFileClick}
        />
      )}
    </div>
  );
};
