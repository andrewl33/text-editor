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

export const findAllCollectionsForAnAccount = async (accountName: string): Promise<string[]> => {
    
  try {
    const resDB = await query(`SELECT collection.url FROM collection INNER JOIN collection_account ON collection.id = collection_account.collection_id WHERE collection_account.account_id = (SELECT id FROM account WHERE account_name='${accountName}')`);
    const collections: string[] = [];

    if (resDB[0].length > 0) {
      resDB[0].forEach(({url}: {url: string}) => {
        collections.push(url);
      });
    }

    return collections;
  } catch(e) {
    console.log(e);
    return [];
  }
} 

export const addCollectionToAccount = async(accountName: string, collectionUuid: string) => {

  try {
    const res = await query(`INSERT INTO collection_account (account_id, collection_id) VALUES ((SELECT id FROM account WHERE account_name='${accountName}'), (SELECT id FROM collection WHERE url='${collectionUuid}'))`);
    return res[0].affectedRows > 0;
  } catch(e) {
    console.log('addCollectionToAccount');
    console.log(e);
    return false;
  }

}

export const removeCollectionFromAccount = async(accountName: string, collectionUuid: string) => {

  try {
    const res = await query(`DELETE FROM collection_account WHERE account_id=(SELECT id FROM account WHERE account_name='${accountName}') AND collection_id=(SELECT id FROM collection WHERE url='${collectionUuid}')`);
    return res[0].affectedRows > 0;
  } catch(e) {
    console.log('removeCollectionFromAccount');
    console.log(e);
    return false;
  }

}

// TODO: find all accounts from a single collection