import query from './query';

// create schema
export const fileAccount = 'file_account';
export const fileAccountModel = `
  CREATE TABLE file_account (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
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


// find all files associated with an account

// find all accounts associated with a file

// add an account to a shared file

// remove an account from a shared file