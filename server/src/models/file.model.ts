import query from './query';

// create schema
export const file = 'file';
export const fileModel = `
  CREATE TABLE file (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(30) NOT NULL,
  updated_date DATE NOT NULL,
  is_private BOOL NOT NULL,
  is_editable BOOL NOT NULL,
  code_text TEXT,
  name VARCHAR(255),
  password VARCHAR(255)
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

export const uuidExists = async (uuid: string): Promise<boolean> => {
  
  let isNotUniqueUuid: boolean = true;

  try {
    const dbRes = await query(`SELECT * FROM file WHERE url='${uuid}'`);
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

export const createNewCodeRow = async (uuid: string): Promise<boolean> => {
  
  let success: boolean = true;

  try {
    await query(`INSERT INTO file (url, updated_date, is_private, is_editable, code_text) VALUES ('${uuid}', now(), FALSE, FALSE, ' ')`);
  } catch(err) {
    console.log("creatNewCodeRow Error:");
    console.log(err);
    success = false;
  }

  return success;
}


export const getTextFromDB = async (url: string): Promise<{success: boolean, codeText: string}> => {
  let code;

  try {
    code = await query(`SELECT code_text FROM file WHERE url='${url}'`);
  } catch(err) {
    console.log("Open err:");
    console.log(err);
    return {success: false, codeText: ''};
  }

  return {success:true, codeText: code[0][0].codeText};
}

export const saveToDB =  async (url: string, codeText: string): Promise<boolean> => {
  try {
    await query(`UPDATE file SET updated_date = now(), code_text = '${codeText}' WHERE url = '${url}'`);
  } catch(err) {
    console.log("Save err:");
    console.log(err);
    return false;
  }

  return true;
}

// make private
const makePrivate = async (uuid: string): Promise<boolean> => {

  let success = false;

  try {
    const res = await query(`UPDATE file SET is_private=TRUE WHERE url='${uuid}'`);
    
    if (res.affectedRows > 0) {
      success = true;
    }

  } catch(e) {
    console.log('file make private error');
    console.log(e);
  }

  return success;

}

// change name
const updateName = async (uuid: string, name: string): Promise<boolean> => {
  
  let success = false;

  try {
    const res = await query(`UPDATE file SET name='${name}' WHERE url='${uuid}'`);
    
    if (res.affectedRows > 0) {
      success = true;
    }

  } catch(e) {
    console.log('file update name error');
    console.log(e);
  }

  return success;

}

// update password 
const updatePassword = async (uuid: string, password: string): Promise<boolean> => {
  
  let success = false;

  try {
    const res = await query(`UPDATE file SET password='${password}' WHERE url='${uuid}'`);
    
    if (res.affectedRows > 0) {
      success = true;
    }

  } catch(e) {
    console.log('file update password error');
    console.log(e);
  }

  return success;

}

// get password
export const getPasswordCollection = async (uuid: string): Promise<{success: boolean, password: string}> => {
  
  let passObj = {success: false, password: ''};

  try {
    const res = await query(`SELECT password FROM file WHERE url='${uuid}'`);
    passObj.success= true;
    passObj.password = res[0][0].password;
  } catch(e) {
    console.log(e);
  }

  return passObj;
}

// delete file
export const deleteFile = async (uuid: string): Promise<boolean> => {
  let success = false;

  try {
    const res = await query(`DELETE FROM file WHERE url='${uuid}'`);

    if (res.affectedRows > 0) {
      success = true;
    }
  } catch(e) {
    console.log(e);
  }

  return success;
}