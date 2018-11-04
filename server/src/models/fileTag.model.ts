import query from "./query";

// create schema
export const fileTag = "file_tag";
export const fileTagModel = `
  CREATE TABLE file_tag (
  file_id int NOT NULL,
  CONSTRAINT \`fk_file_ft\` 
    FOREIGN KEY (file_id) REFERENCES code_file (id)
    ON DELETE CASCADE,
  tag_id int NOT NULL, 
  CONSTRAINT \`fk_tag_ft\` 
    FOREIGN KEY (tag_id) REFERENCES tag (id) 
    ON DELETE CASCADE,
  CONSTRAINT \`file_tag_pk\`
    PRIMARY KEY (file_id, tag_id)
  ) ENGINE=InnoDB;
`.replace(/\n/gm, "");

export const fileTagInsert = async () => {
  const data = [["1", "1"], ["1", "3"]];

  for (let i = 0; i < data.length; i++) {
    await query(`INSERT INTO file_tag (file_id, tag_id) VALUES (?, ?)`, [
      data[i][0],
      data[i][1]
    ]);
  }
};

// add tag to a file
export const addTagToFile = async (
  fileUuid: string,
  tagName: string
): Promise<boolean> => {
  try {
    const res = await query(
      `INSERT INTO file_tag (file_id, tag_id) VALUES ((SELECT id FROM code_file WHERE url=?), (SELECT id FROM tag WHERE name=?))`,
      [fileUuid, tagName]
    );
    return res[0].affectedRows > 0;
  } catch (e) {
    console.log("addTagToFile");
    console.log(e);
  }

  return false;
};
//  remove tag from a file
export const removeTagFromFile = async (
  tagName: string,
  fileUuid: string
): Promise<boolean> => {
  try {
    const res = await query(
      `DELETE FROM file_tag WHERE tag_id = (SELECT id FROM tag WHERE name=?) and file_id=(SELECT id FROM code_file WHERE url=?)`,
      [tagName, fileUuid]
    );
    return res[0].affectedRows > 0;
  } catch (e) {
    console.log("removeTagFromFile");
    console.log(e);
    return false;
  }
};
// see all tags from a file
export const allFileTags = async (
  fileUuid: string
): Promise<{ success: boolean; tags: string[] }> => {
  const fileTagObj = { success: false, tags: [] as string[] };

  try {
    const res = await query(
      `SELECT tag.name FROM tag INNER JOIN file_tag ON tag.id = file_tag.tag_id WHERE file_tag.file_id = (SELECT id FROM code_file WHERE url=?)`,
      [fileUuid]
    );

    if (res[0].length > 0) {
      res[0].forEach(({ name }: { name: string }) => {
        fileTagObj.tags.push(name);
      });
    }

    fileTagObj.success = true;

    return fileTagObj;
  } catch (e) {
    console.log("allFileTags");
    console.log(e);
    return fileTagObj;
  }
};

// TODO: see all files from a tag (might not be needed)
