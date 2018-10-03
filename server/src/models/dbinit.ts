/**
 * For now, clears the DB whenever a dev refresh happens. Must be changed for prod
 */

import query from './query';

import { account, accountModel } from './account.model';
import { collection, collectionModel } from './collection.model';
import { collectionAccount, collectionAccountModel } from './collectionAccount.model';
import { collectionFile, collectionFileModel } from './collectionFile.model';
import { file, fileModel } from './file.model';
import { fileAccount, fileAccountModel } from './fileAccount.model';
import { fileTag, fileTagModel } from './fileTag.model';
import { tag, tagModel } from './tag.model';


const TABLES = [account, collection, collectionAccount, file, collectionFile, fileAccount, tag, fileTag];
const MODELS = [accountModel, collectionModel, collectionAccountModel, fileModel, collectionFileModel, fileAccountModel, tagModel, fileTagModel];

// replaces tables if they exists
async function replaceTable(tables: string[], models: string[], callback: any) {
  for (let i = 0; i < tables.length; i++) {
    await callback(tables[i], models[i], tables, models);
  }
}

export async function startDB() {

  try {
    await query('SET FOREIGN_KEY_CHECKS=0')
  } catch(e) {
    console.log('Could not disable foreign keys');
  }

  await replaceTable(TABLES, MODELS, async (table: string, model: string) => {
    const template = `DROP TABLE IF EXISTS ${table}`;
    try {
      await query(template);
      await query(model);
    } catch(e) {
      console.error(e);
    }
  });

  try {
    await query('SET FOREIGN_KEY_CHECKS=1')
  } catch(e) {
    console.log('Could not re-enable foreign keys');
  }

}
