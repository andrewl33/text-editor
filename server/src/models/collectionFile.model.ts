import query from "./query";

// create schema
export const collectionFile = "collection_file";
export const collectionFileModel = `
  CREATE TABLE collection_file (
  collection_id int NOT NULL,
  CONSTRAINT \`fk_collection_cf\`
    FOREIGN KEY (collection_id) REFERENCES collection (id) 
    ON DELETE CASCADE,
  file_id int NOT NULL,
  CONSTRAINT \`fk_file_cf\` 
    FOREIGN KEY (file_id) REFERENCES code_file (id)
    ON DELETE CASCADE,
  CONSTRAINT \`collection_file_pk\`
    PRIMARY KEY (collection_id, file_id)
  ) ENGINE=InnoDB;
`.replace(/\n/gm, "");

export const collectionFileInsert = async () => {
  const data = [["1", "1"], ["1", "2"], ["1", "3"], ["1", "4"]];

  for (let i = 0; i < data.length; i++) {
    await query(
      `INSERT INTO collection_file (collection_id, file_id) VALUES ('${
        data[i][0]
      }', '${data[i][1]}')`
    );
  }
};

interface IFile {
  id: string;
  createDate: string;
  name: string;
}

// get all files from a collection
export const getFilesFromCollection = async (
  uuid: string
): Promise<{
  success: boolean;
  files?: IFile[];
}> => {
  try {
    const res = await query(
      `SELECT code_file.url, code_file.updated_date, code_file.name FROM code_file INNER JOIN collection_file ON code_file.id = collection_file.file_id INNER JOIN collection ON collection.id=collection_file.collection_id WHERE collection.url = '${uuid}'`
    );

    const files: IFile[] = [];

    if (res[0].length > 0) {
      res[0].forEach(
        (file: { url: string; updated_date: string; name: string }) => {
          files.push({
            id: file.url,
            createDate: file.updated_date,
            name: file.name
          });
        }
      );
    }

    return { success: true, files };
  } catch (e) {
    console.log("getFilesFromCollection");
    console.log(e);
    return { success: false };
  }
};

// add a file to a collection
export const addFileToCollection = async (
  colUuid: string,
  fileUuid: string
) => {
  try {
    const res = await query(
      `INSERT INTO collection_file (collection_id, file_id) VALUES ((SELECT collection.id from collection WHERE collection.url = '${colUuid}'), (SELECT code_file.id FROM code_file WHERE code_file.url = '${fileUuid}'))`
    );
    return { success: res[0].affectedRows > 0 };
  } catch (e) {
    console.log("addFileToCollection");
    console.log(e);
    return { success: false };
  }
};

export const removeFileFromCollection = async (
  colUuid: string,
  fileUuid: string
) => {
  try {
    const res = await query(
      `DELETE FROM collection_file WHERE collection_id=(SELECT collection.id FROM collection WHERE collection.url='${colUuid}') AND file_id = (SELECT code_file.id FROM code_file WHERE code_file.url='${fileUuid}')`
    );
    return { success: res[0].affectedRows > 0 };
  } catch (e) {
    console.log("removeFileFromCollection");
    console.log(e);
    return { success: false };
  }
};
