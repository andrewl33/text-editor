import query from './query';

// create schema
export const fileTag = 'file_tag';
export const fileTagModel = `
  CREATE TABLE file_tag (
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

export const fileTagInsert = async () => {
  const data = [
    ["1", "1"],
    ["1", "3"]
  ];

  for (let i = 0; i < data.length; i++) {
    await query(`INSERT INTO file_tag (file_id, tag_id) VALUES ('${data[i][0]}', '${data[i][1]}')`);
  }
}

// add tag to a file

//  remove tag from a file

// see all tags from a file

// see all files from a tag