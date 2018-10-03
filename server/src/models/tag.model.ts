import query from './query';

// create schema
export const tag = 'tag';
export const tagModel = `
  CREATE TABLE tag (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

// insert tag
const createNewTag = async (name: string): Promise<boolean> => {
  
  let success = true;

  try {
    await query(`INSERT INTO tag (name) VALUES ('${name}')`);

  } catch(e) {
    console.log('create new tag err');
    console.log(e);
    success = false;
  }

  return success;
}

// see all tags
const allTags = async (): Promise<{success: boolean, tagArray: string[]}> => {
  
  let tagObj = {success: true, tagArray: [] as string[]};

  try {
    const res = await query (`SELECT * FROM tag`);
    console.log(res);
  } catch(e) {

    console.log(e);
  }

  return tagObj;
}