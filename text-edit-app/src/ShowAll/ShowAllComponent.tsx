/**
 * Used for grading
 */

// tslint:disable

// TODO: add a filter
import * as React from "react";
import { Table } from "semantic-ui-react";
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
    fileTagInfo: []
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
      return (
        <Table.Row key={idx}>
          {keyList.map((label: string, innerIdx: number) => {
            return <Table.Cell key={innerIdx}>{row[label]}</Table.Cell>;
          })}
        </Table.Row>
      );
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
