import query from './query';

// create schema
export const tag = 'tag';
export const tagModel = `
  CREATE TABLE tag (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

// insert tag

// delete tag

// see all tags