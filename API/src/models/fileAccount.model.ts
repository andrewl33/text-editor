import query from "./query";

// create schema
export const fileAccount = "file_account";
export const fileAccountModel = `
  CREATE TABLE file_account (
  file_id int NOT NULL,
  CONSTRAINT \`fk_file_fa\` 
    FOREIGN KEY (file_id) REFERENCES code_file (id)
    ON DELETE CASCADE,
  account_id int NOT NULL,
  CONSTRAINT \`fk_account_fa\`
    FOREIGN KEY (account_id) REFERENCES account (id) 
    ON DELETE CASCADE,
  CONSTRAINT \`file_account_pk\`
    PRIMARY KEY (file_id, account_id)
  ) ENGINE=InnoDB;
`.replace(/\n/gm, "");

export const fileAccountInsert = async () => {
  const data = [
    ["1", "1"],
    ["1", "2"],
    ["1", "3"],
    ["1", "4"],
    ["2", "4"],
    ["5", "4"]
  ];

  for (let i = 0; i < data.length; i++) {
    await query(
      `INSERT INTO file_account (file_id, account_id) VALUES ('${
        data[i][0]
      }', '${data[i][1]}')`
    );
  }
};

export const findAllFilesForAnAccount = async (
  accountName: string
): Promise<string[]> => {
  try {
    const resDB = query(
      `SELECT code_file.url FROM code_file INNER JOIN file_account ON code_file.id = file_account.file_id WHERE file_account.account_id = (SELECT id FROM account WHERE account_name='${accountName}')`
    );
    const files: string[] = [];

    if (resDB[0].length > 0) {
      resDB[0].forEach(({ url }: { url: string }) => {
        files.push(url);
      });
    }

    return files;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const addFileToAccount = async (
  accountName: string,
  fileUuid: string
) => {
  try {
    const res = await query(
      `INSERT INTO file_account (account_id, file_id) VALUES ((SELECT id FROM account WHERE account_name='${accountName}'), (SELECT id FROM code_file WHERE url='${fileUuid}'))`
    );
    return res[0].affectedRows > 0;
  } catch (e) {
    console.log("addFileToAccount");
    console.log(e);
    return false;
  }
};

export const removeFileFromAccount = async (
  accountName: string,
  fileUuid: string
) => {
  try {
    const res = await query(
      `DELETE FROM file_account WHERE account_id=(SELECT id FROM account WHERE account_name='${accountName}') AND file_id=(SELECT id FROM code_file WHERE url='${fileUuid}')`
    );
    return res[0].affectedRows > 0;
  } catch (e) {
    console.log("addFileToAccount");
    console.log(e);
    return false;
  }
};

// TODO: find all accounts associated with a file
