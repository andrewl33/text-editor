import * as React from "react";
import { ListComponent } from "../generic/Lists/ListComponent";
import { DashboardProps } from "../types";

export const DashboardComponent = (
  props: DashboardProps
): React.ReactElement<DashboardProps> => {
  return (
    <div>
      {props.collections && (
        <ListComponent header="Collections" items={...props.collections} />
      )}
      {props.files && <ListComponent header="Files" items={...props.files} />}
    </div>
  );
};
