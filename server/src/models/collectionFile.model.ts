import query from './query';

// create schema
export const collectionFile = 'collection_file';
export const collectionFileModel = `
  CREATE TABLE collection_file (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
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


// get all files from a collection

// add a file to a collection

// remove a file from a collection