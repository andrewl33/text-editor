import query from './query';

// create schema
export const collectionAccount = 'collection_account';
export const collectionAccountModel = `
  CREATE TABLE collection_account (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  collection_id int NOT NULL,
  CONSTRAINT \`fk_collection_ca\`
    FOREIGN KEY (collection_id) REFERENCES collection (id) 
    ON DELETE CASCADE,
  account_id int NOT NULL,
  CONSTRAINT \`fk_account_ca\`
    FOREIGN KEY (account_id) REFERENCES account (id) 
    ON DELETE CASCADE
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

// find all collections from a single account

// find all accounts from a single collection

// add an account to a collection

// remove an account from a collection