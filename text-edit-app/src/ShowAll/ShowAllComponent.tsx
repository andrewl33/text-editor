/**
 * Used for grading
 */

// tslint:disable
import { push } from "connected-react-router";
import { connect } from "react-redux";
import * as React from "react";
import { Input, Table, Button, Icon } from "semantic-ui-react";
import { API_URL as URL } from "../envConstants";

export class ShowAll extends React.Component<any, any> {
  state = {
    accountInfo: [],
    codeFileInfo: [],
    collectionInfo: [],
    tagInfo: [],
    collectionFileInfo: [],
    collectionOwnerInfo: [],
    fileOwnerInfo: [],
    fileTagInfo: [],
    codeFileFilteredInfo: [],
    searchItem: "",
    searchCodeText: "",
    isFiltered: false
  };

  async componentDidMount() {
    try {
      await this.fetchAllData(false);
    } catch (e) {}
  }

  async fetchAllData(isFiltered: boolean) {
    const data = {
      isFilter: isFiltered,
      filterString: this.state.searchCodeText
    };

    const res = await fetch(`${URL}/grading/all`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
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
    console.log(body);
    if (isFiltered) {
      this.setState({
        accountInfo,
        collectionInfo,
        codeFileInfo,
        tagInfo,
        collectionFileInfo,
        collectionOwnerInfo,
        fileOwnerInfo,
        fileTagInfo,
        codeFileFilteredInfo: body.filteredText,
        isFiltered: true
      });
    } else {
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
  }

  buildTable = (data: any, option = "none") => {
    if (data.length <= 0) {
      return undefined;
    }

    // header
    const keyList = Object.keys(data[0]).sort();
    const header = keyList.map((label: string, idx: number) => {
      return (
        label !== "code_text" &&
        label !== "id" && <Table.HeaderCell key={idx}>{label}</Table.HeaderCell>
      );
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

            if (label === "url") {
              if (option === "file") {
                return (
                  <Table.Cell key={innerIdx}>
                    <Button
                      icon
                      labelPosition="right"
                      onClick={() => this.props.toFilePage(row[label])}
                    >
                      <Icon name="external alternate" />
                      {row[label]}
                    </Button>
                  </Table.Cell>
                );
              } else if (option === "collection") {
                return (
                  <Table.Cell key={innerIdx}>
                    <Button
                      icon
                      labelPosition="right"
                      onClick={() => this.props.toCollectionPage(row[label])}
                    >
                      <Icon name="external alternate" />
                      {row[label]}
                    </Button>
                  </Table.Cell>
                );
              }
            }

            return (
              label !== "code_text" &&
              label !== "id" && (
                <Table.Cell key={innerIdx}>{row[label]}</Table.Cell>
              )
            );
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

  /**
   * Filtered Search
   */
  handleSearchCodeText = (e: React.SyntheticEvent) => {
    this.setState({ searchCodeText: (e.target as HTMLInputElement).value });
  };

  onFindCodeText = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.fetchAllData(true);
  };

  clearFilter = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({ isFiltered: false });
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
      fileTagInfo,
      codeFileFilteredInfo
    } = this.state;

    const tAccount = this.buildTable(accountInfo);
    const tCodeFile = this.buildTable(codeFileInfo, "file");
    const tCollection = this.buildTable(collectionInfo, "collection");
    const tTag = this.buildTable(tagInfo);
    const tColFile = this.buildTable(collectionFileInfo);
    const tFilteredCodeFile =
      this.state.isFiltered && this.buildTable(codeFileFilteredInfo, "file");
    const tColOwner = this.buildTable(collectionOwnerInfo, "collection");
    const tFileOwner = this.buildTable(fileOwnerInfo, "file");
    const tFileTag = this.buildTable(fileTagInfo, "collection");

    return (
      <div style={{ color: "white" }}>
        <h1>
          Grading: Only used for graders, will not be exposed on real site
        </h1>
        <h2>Searches for any entry that matches the search string</h2>
        <Input
          placeholder="Search..."
          value={this.state.searchItem}
          onChange={this.handleSearch}
        />
        <h2>Searches by text in each file</h2>
        <Input
          placeholder="Search..."
          value={this.state.searchCodeText}
          onChange={this.handleSearchCodeText}
        />
        <Button primary={true} onClick={this.onFindCodeText}>
          Find In Text
        </Button>
        <Button primary={true} onClick={this.clearFilter}>
          Clear Filter
        </Button>
        <h2>Account</h2>
        {tAccount}
        <h2>
          {this.state.isFiltered
            ? "File Info With Text: " + this.state.searchCodeText
            : "File Info"}
        </h2>
        {this.state.isFiltered ? tFilteredCodeFile : tCodeFile}
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    toFilePage: (url: string) => dispatch(push(`/files/${url}`)),
    toCollectionPage: (url: string) => dispatch(push(`/collections/${url}`))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ShowAll);
