import query from "./query";
export default async function showAll() {
  try {
    const accountInfo = await query("select * from account");
    const codeFileInfo = await query("select * from code_file");
    const collectionInfo = await query("select * from collection");
    const tagInfo = await query("select * from tag");
    const collectionFileInfo = await query(
      "select collection.name as col_name, code_file.name as file_name, collection.url as col_url, code_file.url as file_url from collection inner join collection_file on collection.id = collection_file.collection_id inner join code_file on collection_file.file_id = code_file.id"
    );
    const collectionOwnerInfo = await query(
      "select collection.url, collection.name, account.account_name from account inner join collection_account on account.id = collection_account.account_id inner join collection on collection_account.collection_id = collection.id"
    );
    const fileOwnerInfo = await query(
      "select code_file.url, code_file.name, account.account_name from account inner join file_account on account.id = file_account.account_id inner join code_file on file_account.file_id = code_file.id"
    );
    const fileTagInfo = await query(
      "select tag.name as tag_name, code_file.url, code_file.name as file_name from tag inner join file_tag on file_tag.tag_id = tag.id inner join code_file on code_file.id = file_tag.file_id"
    );

    const allInfo = {
      accountInfo: accountInfo[0],
      codeFileInfo: codeFileInfo[0],
      collectionInfo: collectionInfo[0],
      tagInfo: tagInfo[0],
      collectionFileInfo: collectionFileInfo[0],
      collectionOwnerInfo: collectionOwnerInfo[0],
      fileOwnerInfo: fileOwnerInfo[0],
      fileTagInfo: fileTagInfo[0]
    };

    return allInfo;
  } catch (e) {
    console.log("ShowAllModel");
    console.log(e);
  }
}

export const filterText = async (searchString: string) => {
  try {
    const codeText = await query(
      `select * from code_file where code_text like concat('%', ? ,'%')`,
      [searchString]
    );

    return codeText[0];
  } catch (e) {
    console.log(e);
  }
};
