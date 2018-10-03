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

// check that url is free
export const urlExists = async (uuid: string): Promise<boolean> => {
  
  let isNotUniqueUuid: boolean = true;

  try {
    const dbRes = await query(`SELECT * FROM collection WHERE url='${uuid}'`);
    if (dbRes[0].length ===  0) {
      isNotUniqueUuid = false;
    }
  } catch(e) {
    console.log("uuidExists Error:");
    console.log(e);
    isNotUniqueUuid = false;
  }

  return isNotUniqueUuid;
}

// insert new collection
const insertNewCollection = async (uuid: string): Promise<boolean> => {
  
  let success: boolean = true;

  try {
    await query(`INSERT INTO collection (url, updated_date, default_ordering, is_private) VALUES ('${uuid}', now(), 'date', FALSE)`);
  } catch(err) {
    console.log("createNewCollection Error:");
    console.log(err);
    success = false;
  }

  return success;
}
// update to private
const updateToPrivate = async (uuid: string): Promise<boolean> => {

  let success = false;

  try {
    const res = await query(`UPDATE collection SET is_private=TRUE WHERE url='${uuid}'`);
    
    if (res.affectedRows > 0) {
      success = true;
    }

  } catch(e) {
    console.log('Collection make private error');
    console.log(e);
  }

  return success;

}
// update name

const updateName = async (uuid: string, name: string): Promise<boolean> => {
  
  let success = false;

  try {
    const res = await query(`UPDATE collection SET name='${name}' WHERE url='${uuid}'`);
    
    if (res.affectedRows > 0) {
      success = true;
    }

  } catch(e) {
    console.log('Collection update name error');
    console.log(e);
  }

  return success;

}

// update password
const updatePassword = async (uuid: string, password: string): Promise<boolean> => {
  
  let success = false;

  try {
    const res = await query(`UPDATE collection SET password='${password}' WHERE url='${uuid}'`);
    
    if (res.affectedRows > 0) {
      success = true;
    }

  } catch(e) {
    console.log('Collection update password error');
    console.log(e);
  }

  return success;

}

// get password
export const getPasswordCollection = async (uuid: string): Promise<{success: boolean, password: string}> => {
  
  let passObj = {success: false, password: ''};

  try {
    const res = await query(`SELECT password FROM collection WHERE url='${uuid}'`);
    passObj.success= true;
    passObj.password = res[0][0].password;
  } catch(e) {
    console.log(e);
  }

  return passObj;
}

// delete collection
export const deleteCollection = async (uuid: string): Promise<boolean> => {
  let success = false;

  try {
    const res = await query(`DELETE FROM collection WHERE url='${uuid}'`);

    if (res.affectedRows > 0) {
      success = true;
    }
  } catch(e) {
    console.log(e);
  }

  return success;
}