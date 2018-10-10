import query from './query';

// create schema
export const tag = 'tag';
export const tagModel = `
  CREATE TABLE tag (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
  ) ENGINE=InnoDB;
`.replace(/\n/gm,"");

export const initialTagInsert = async () => {
  
  const data = ["JavaScript", "Plain text", "Hacks"];

  for (let i = 0; i < data.length; i++) {
    await createNewTag(data[i]);
  }

}

// insert tag
export const createNewTag = async (name: string): Promise<boolean> => {
  
  try {
    const res = await query(`INSERT INTO tag (name) VALUES ('${name}')`);
    return res[0].affectedRows > 0;
  } catch(e) {
    console.log('create new tag err');
    console.log(e);
    return false;
  }

}

// see all tags
export const allTags = async (): Promise<{success: boolean, tags: string[]}> => {
  
  let tagObj = {success: true, tags: [] as string[]};

  try {
    
    const res = await query (`SELECT * FROM tag`);
    tagObj.success = false;
    if (res[0].length > -1) {
      res[0].forEach(({ name }: {id: number, name: string}) => {
        tagObj.tags.push(name);
      });
    }

  } catch(e) {
    console.log("all tags");
    console.log(e);
  }

  return tagObj;
}