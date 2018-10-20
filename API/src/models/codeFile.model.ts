import query from './query';

// create schema
export const codeFile = 'code_file';
export const codeFileModel = `
  CREATE TABLE code_file (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(50) NOT NULL,
  updated_date DATE NOT NULL,
  is_private BOOL NOT NULL,
  is_editable BOOL NOT NULL,
  code_text TEXT,
  name VARCHAR(255),
  password VARCHAR(255)
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

export const intialFileInsert = async () => {
  
  for (let i = 0; i < 10; i++) {
    await createNewCodeRow(String(i+1));
  }


  // set text
 for (let i = 0; i < 10; i++) {
   await saveToDB(String(i+1), 'text items ' + String(i+1));
 }
  
  // set private
  makePrivate("1");
  updatePassword("1", "password1");
  makePrivate("6");
  updatePassword("6", "hunter2");


  // update name
  updateName("4", "Name4");
  updateName("5", "Name5");
  updateName("7", "Andrews file");
}

export const uuidExists = async (uuid: string): Promise<boolean> => {
  
  let isNotUniqueUuid: boolean = true;

  try {
    const dbRes = await query(`SELECT * FROM code_file WHERE url='${uuid}'`);
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
    await query(`INSERT INTO code_file (url, updated_date, is_private, is_editable, code_text) VALUES ('${uuid}', now(), FALSE, TRUE, ' ')`);
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
    code = await query(`SELECT code_text FROM code_file WHERE url='${url}'`);
  } catch(err) {
    console.log("Open err:");
    console.log(err);
    return {success: false, codeText: ''};
  }

  return {success:true, codeText: code[0][0].code_text};
}

export const saveToDB =  async (url: string, codeText: string): Promise<boolean> => {
  try {
    await query(`UPDATE code_file SET updated_date = now(), code_text = '${codeText}' WHERE url = '${url}'`);
  } catch(err) {
    console.log("Save err:");
    console.log(err);
    return false;
  }

  return true;
}

// make private
export const makePrivate = async (uuid: string): Promise<boolean> => {

  let success = false;

  try {
    const res = await query(`UPDATE code_file SET is_private=TRUE WHERE url='${uuid}'`);
    
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
export const updateName = async (uuid: string, name: string): Promise<boolean> => {
  
  let success = false;

  try {
    const res = await query(`UPDATE code_file SET name='${name}' WHERE url='${uuid}'`);
    
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
export const updatePassword = async (uuid: string, password: string): Promise<boolean> => {
  
  let success = false;

  try {
    const res = await query(`UPDATE code_file SET password='${password}' WHERE url='${uuid}'`);
    
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
export const getPassword = async (uuid: string): Promise<{success: boolean, password: string}> => {
  
  let passObj = {success: false, password: ''};

  try {
    const res = await query(`SELECT password FROM code_file WHERE url='${uuid}'`);
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
    const res = await query(`DELETE FROM code_file WHERE url='${uuid}'`);
    if (res[0].affectedRows > 0) {
      success = true;
    }
  } catch(e) {
    console.log(e);
  }

  return success;
}

// check if file is password protected
export const isPrivate = async(uuid: string): Promise<boolean> => {

  try {
    const res = await query(`SELECT is_private FROM code_file WHERE url='${uuid}'`);
    return res[0][0].is_private === 1 ? true : false;
  } catch(e) {
    console.log(e);
  }

}