import query from './query';

// create schema
export const collection = 'collection';
export const collectionModel = `
  CREATE TABLE collection (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(30) NOT NULL,
  updated_date DATE NOT NULL,
  default_ordering VARCHAR(30) NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255),
  is_private BOOL NOT NULL
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

// insert new collection

// update to private

// update name

// update password

// delete collection