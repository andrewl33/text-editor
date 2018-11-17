/**
 * Used for grading
 */

// tslint:disable

import * as React from "react";
import { Input, Table } from "semantic-ui-react";
import { API_URL as URL } from "../envConstants";

export default class ShowAll extends React.Component {
  state = {
    accountInfo: [],
    codeFileInfo: [],
    collectionInfo: [],
    tagInfo: [],
    collectionFileInfo: [],
    collectionOwnerInfo: [],
    fileOwnerInfo: [],
    fileTagInfo: [],
    searchItem: ""
  };

  async componentDidMount() {
    try {
      await this.fetchAllData();
    } catch (e) {}
  }

  async fetchAllData() {
    const res = await fetch(`${URL}/grading/all`);
    const body = await res.json();
    const {
      accountInfo,
      codeFileInfo,
      collectionInfo,
      tagInfo,
      collectionFileInfo,
      collectionOwnerInfo,
      fileOwnerInfo,
      fileTagInfo
    } = body.allInfo;

    this.setState({
      accountInfo,
      collectionInfo,
      codeFileInfo,
      tagInfo,
      collectionFileInfo,
      collectionOwnerInfo,
      fileOwnerInfo,
      fileTagInfo
    });
  }

  buildTable = (data: any) => {
    if (data.length <= 0) {
      return undefined;
    }

    // header
    const keyList = Object.keys(data[0]).sort();
    const header = keyList.map((label: string, idx: number) => {
      return <Table.HeaderCell key={idx}>{label}</Table.HeaderCell>;
    });

    // body
    const body = data.map((row: any, idx: number) => {
      let isValid = false;
      const regex = new RegExp(this.state.searchItem, "i");

      const tRow = (
        <Table.Row key={idx}>
          {keyList.map((label: string, innerIdx: number) => {
            isValid =
              isValid ||
              (row[label] !== null && row[label].toString().match(regex));

            return <Table.Cell key={innerIdx}>{row[label]}</Table.Cell>;
          })}
        </Table.Row>
      );
      return isValid ? tRow : undefined;
    });

    return (
      <Table celled={true} striped={true}>
        <Table.Header>
          <Table.Row>{header}</Table.Row>
        </Table.Header>
        <Table.Body>{body}</Table.Body>
      </Table>
    );
  };

  /**
   * Search
   */

  handleSearch = (e: React.SyntheticEvent) => {
    this.setState({ searchItem: (e.target as HTMLInputElement).value });
  };

  render() {
    const {
      accountInfo,
      codeFileInfo,
      collectionInfo,
      tagInfo,
      collectionFileInfo,
      collectionOwnerInfo,
      fileOwnerInfo,
      fileTagInfo
    } = this.state;

    const tAccount = this.buildTable(accountInfo);
    const tCodeFile = this.buildTable(codeFileInfo);
    const tCollection = this.buildTable(collectionInfo);
    const tTag = this.buildTable(tagInfo);
    const tColFile = this.buildTable(collectionFileInfo);
    const tColOwner = this.buildTable(collectionOwnerInfo);
    const tFileOwner = this.buildTable(fileOwnerInfo);
    const tFileTag = this.buildTable(fileTagInfo);

    return (
      <div style={{ color: "white" }}>
        <Input
          placeholder="Search..."
          value={this.state.searchItem}
          onChange={this.handleSearch}
        />
        <h2>Account</h2>
        {tAccount}
        <h2>File Info</h2>
        {tCodeFile}
        <h2>Collections</h2>
        {tCollection}
        <h2>Tags</h2>
        {tTag}
        <h2>Files in Collections</h2>
        {tColFile}
        <h2>Account Owning Collections</h2>
        {tColOwner}
        <h2>Account Owning Files</h2>
        {tFileOwner}
        <h2>Files With Tags</h2>
        {tFileTag}
      </div>
    );
  }
}
