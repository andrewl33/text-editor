import * as React from "react";
import { Container, Grid } from "semantic-ui-react";
import { ListComponent } from "../generic/Lists/ListComponent";
import SidebarComponent from "../generic/Sidebar/SidebarComponent";
import { CollectionComponentProps } from "../types";
// TODO: add styling
export const CollectionComponent = (props: CollectionComponentProps) => {
  const { name, createDate, isLocked, users } = props;

  return (
    <Grid style={{ marginTop: 0, height: "100%" }}>
      <Grid.Column width={13} style={{ paddingRight: 0, paddingTop: 0 }}>
        <ListComponent header="Files" {...props} />
      </Grid.Column>
      <Grid.Column
        width={3}
        textAlign="center"
        style={{
          paddingRight: "2em",
          backgroundColor: "#3180d4",
          height: "100%"
        }}
      >
        <Container>
          <SidebarComponent
            name={name}
            pageType="collection"
            createDate={createDate}
            isPrivate={isLocked}
            users={users}
            // tslint:disable-next-line
            onNameChange={a => {}}
          />
        </Container>
      </Grid.Column>
    </Grid>
  );
};
