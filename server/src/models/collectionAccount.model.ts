import query from './query';

// create schema
export const collectionAccount = 'collection_account';
export const collectionAccountModel = `
  CREATE TABLE collection_account (
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

export const collectionAccountInsert = async () => {
  const data = [
    ["1", "1"],
    ["7", "5"]
  ];

  for (let i = 0; i < data.length; i++) {
    await query(`INSERT INTO collection_account (collection_id, account_id) VALUES ('${data[i][0]}', '${data[i][1]}')`);
  }
}

// find all collections from a single account
// export const findAllCollectionsForAnAccount = async (accountName: string): Promise<string[]> => {
//   try {
//     const template = 'SELECT FROM collection_account '
//   } catch(e) {
//     console.log(e);
//     return [];
//   }
// } 
// find all accounts from a single collection

// add an account to a collection

// remove an account from a collection