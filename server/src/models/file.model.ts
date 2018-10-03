import query from './query';

// create schema
export const file = 'file';
export const fileModel = `
  CREATE TABLE file (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(30) NOT NULL,
  updated_date DATE NOT NULL,
  is_locked BOOL NOT NULL,
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
    await query(`INSERT INTO file (url, updated_date, is_locked, is_editable, code_text) VALUES ('${uuid}', now(), FALSE, FALSE, ' ')`);
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

// delete file