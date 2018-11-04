import * as React from "react";
import { ListComponent } from "../generic/Lists/ListComponent";
import { DashboardProps } from "../types";

export const DashboardComponent = (
  props: DashboardProps
): React.ReactElement<DashboardProps> => {
  return (
    <div>
      {props.dashboard!.collections &&
        props.onCollectionClick && (
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
