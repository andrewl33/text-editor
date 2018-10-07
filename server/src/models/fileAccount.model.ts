import query from './query';

// create schema
export const fileAccount = 'file_account';
export const fileAccountModel = `
  CREATE TABLE file_account (
  file_id int NOT NULL,
  CONSTRAINT \`fk_file_fa\` 
    FOREIGN KEY (file_id) REFERENCES file (id)
    ON DELETE CASCADE,
  account_id int NOT NULL,
  CONSTRAINT \`fk_account_fa\`
    FOREIGN KEY (account_id) REFERENCES account (id) 
    ON DELETE CASCADE
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

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
    await query(`INSERT INTO file_account (file_id, account_id) VALUES ('${data[i][0]}', '${data[i][1]}')`);
  }
}

// find all files associated with an account

// find all accounts associated with a file

// add an account to a shared file

// remove an account from a shared file