import query from './query';

// create schema
export const collectionFile = 'collection_file';
export const collectionFileModel = `
  CREATE TABLE collection_file (
  collection_id int NOT NULL,
  CONSTRAINT \`fk_collection_cf\`
    FOREIGN KEY (collection_id) REFERENCES collection (id) 
    ON DELETE CASCADE,
  file_id int NOT NULL,
  CONSTRAINT \`fk_file_cf\` 
    FOREIGN KEY (file_id) REFERENCES file (id)
    ON DELETE CASCADE
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

export const collectionFileInsert = async () => {
  const data = [
    ["1", "1"],
    ["1", "2"],
    ["1", "3"],
    ["1", "4"]
  ];

  for (let i = 0; i < data.length; i++) {
    await query(`INSERT INTO collection_file (collection_id, file_id) VALUES ('${data[i][0]}', '${data[i][1]}')`);
  }
}

// get all files from a collection

// add a file to a collection

// remove a file from a collection