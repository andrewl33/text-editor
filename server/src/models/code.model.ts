
import query from './query';

// create schema
export const code = 'code';
export const codeModel = `
  CREATE TABLE code (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) not null,
  date date not null,
  isLocked boolean not null,
  codeText text
  )
`.replace(/\n/gm,"");

export const uuidExists = async (uuid: string): Promise<boolean> => {
  
  let isNotUniqueUuid: boolean = true;

  try {
    const dbRes = await query(`SELECT exists(SELECT 1 FROM code WHERE url='${uuid}')`);
    isNotUniqueUuid = await dbRes.rows[0].exists;
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
    await query(`INSERT INTO code (url, date, isLocked, codeText) VALUES ('${uuid}', now(), FALSE, ' ')`);
  } catch(err) {
    console.log("creatNewCodeRow Error:")
    console.log(err);
    success = false;
  }

  return success;
}


export const getTextFromDB = async (url: string): Promise<{success: boolean, codeText: string}> => {
  let code;

  try {
    code = await query(`SELECT codeText FROM code WHERE url='${url}'`);
  } catch(err) {
    console.log("Open err:");
    console.log(err);
    return {success: false, codeText: ''};
  }

  return {success:true, codeText: code.rows[0].codetext};
}

export const saveToDB =  async (url: string, codeText: string): Promise<boolean> => {
  try {
    // await this.codeRespository.update({url}, {date: 'now()', codeText: request.body.codeText});
    await query(`UPDATE code SET date = now(), codeText = '${codeText}' WHERE url = '${url}'`);
  } catch(err) {
    console.log("Save err:");
    console.log(err);
    return false;
  }

  return true;
}