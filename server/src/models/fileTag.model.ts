import query from './query';

// create schema
export const fileTag = 'file_tag';
export const fileTagModel = `
  CREATE TABLE file_tag (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  file_id int NOT NULL,
  CONSTRAINT \`fk_file_ft\` 
    FOREIGN KEY (file_id) REFERENCES file (id)
    ON DELETE CASCADE,
  tag_id int NOT NULL, 
  CONSTRAINT \`fk_tag_ft\` 
    FOREIGN KEY (tag_id) REFERENCES tag (id) 
    ON DELETE CASCADE
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

// add tag to a file

//  remove tag from a file

// see all tags from a file

// see all files from a tag