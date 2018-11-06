import query from "./query";

// create schema
export const collection = "collection";
export const collectionModel = `
  CREATE TABLE collection (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(50) NOT NULL,
  updated_date DATE NOT NULL,
  default_ordering VARCHAR(30) NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255),
  is_private BOOL NOT NULL
  ) ENGINE=InnoDB;
`.replace(/\n/gm, "");

export const initialCollectionInsert = async () => {
  const data = ["1", "2", "3", "4", "5", "6", "7"];

  for (let i = 0; i < data.length; i++) {
    await insertNewCollection(data[i]);
  }

  await updateToPrivate("4");
  await updateToPrivate("6");
  await updatePassword("4", "password1");
  await updatePassword("6", "password2");

  await updateName("7", "name of collection");
};

// check that url is free
export const urlExists = async (uuid: string): Promise<boolean> => {
  let isNotUniqueUuid: boolean = true;

  try {
    const dbRes = await query(`SELECT * FROM collection WHERE url=?`, [uuid]);
    if (dbRes[0].length === 0) {
      isNotUniqueUuid = false;
    }
  } catch (e) {
    console.log("uuidExists Error:");
    console.log(e);
    isNotUniqueUuid = false;
  }

  return isNotUniqueUuid;
};

export const getCollectionInfo = async (
  uuid: string
): Promise<
  | {
      success: true;
      info: {
        id: string;
        createDate: string;
        name: string;
        isPrivate: boolean;
        users?: string[];
      };
    }
  | { success: false }
> => {
  try {
    const collectionInfoRes = await query(
      `SELECT * FROM collection WHERE url=?`,
      [uuid]
    );

    if (collectionInfoRes[0] === []) {
      return { success: false };
    } else {
      const colInfo = {
        id: collectionInfoRes[0][0].url,
        createDate: collectionInfoRes[0][0].updated_date,
        name: collectionInfoRes[0][0].name,
        isPrivate: collectionInfoRes[0][0].is_private === 1 ? true : false,
        users: [] as string[]
      };

      return { success: true, info: colInfo };
    }
  } catch (e) {
    console.log("getCollectionInfo");
    console.log(e);
    return { success: false };
  }
};

// insert new collection
export const insertNewCollection = async (uuid: string): Promise<boolean> => {
  let success: boolean = true;

  try {
    await query(
      `INSERT INTO collection (url, updated_date, default_ordering, is_private) VALUES (?, now(), 'date', FALSE)`,
      [uuid]
    );
  } catch (err) {
    console.log("createNewCollection Error:");
    console.log(err);
    success = false;
  }

  return success;
};

// update to private
export const updateToPrivate = async (uuid: string): Promise<boolean> => {
  let success = false;

  try {
    const res = await query(
      `UPDATE collection SET is_private=TRUE WHERE url=?`,
      [uuid]
    );

    if (res.affectedRows > 0) {
      success = true;
    }
  } catch (e) {
    console.log("Collection make private error");
    console.log(e);
  }

  return success;
};

// update name
export const updateName = async (
  uuid: string,
  name: string
): Promise<boolean> => {
  let success = false;

  try {
    const res = await query(`UPDATE collection SET name=? WHERE url=?`, [
      name,
      uuid
    ]);
    if (res[0].affectedRows > 0) {
      success = true;
    }
  } catch (e) {
    console.log("Collection update name error");
    console.log(e);
  }

  return success;
};

// update password
export const updatePassword = async (
  uuid: string,
  password: string
): Promise<boolean> => {
  let success = false;

  try {
    const res = await query(`UPDATE collection SET password=? WHERE url=?`, [
      password,
      uuid
    ]);

    if (res.affectedRows > 0) {
      success = true;
    }
  } catch (e) {
    console.log("Collection update password error");
    console.log(e);
  }

  return success;
};

// get password
export const getPasswordCollection = async (
  uuid: string
): Promise<{ success: boolean; password: string }> => {
  const passObj = { success: false, password: "" };

  try {
    const res = await query(`SELECT password FROM collection WHERE url=?`, [
      uuid
    ]);
    passObj.success = true;
    passObj.password = res[0][0].password;
  } catch (e) {
    console.log(e);
  }

  return passObj;
};

// delete collection
export const deleteCollection = async (uuid: string): Promise<boolean> => {
  let success = false;

  try {
    const res = await query(`DELETE FROM collection WHERE url=?`, [uuid]);

    if (res.affectedRows > 0) {
      success = true;
    }
  } catch (e) {
    console.log(e);
  }

  return success;
};

// check if collection is password protected
export const isPrivate = async (uuid: string): Promise<boolean> => {
  try {
    const res = await query(`SELECT is_private FROM collection WHERE url=?`, [
      uuid
    ]);
    return res[0][0].is_private === 1 ? true : false;
  } catch (e) {
    console.log(e);
  }
};
