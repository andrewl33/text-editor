/**
 * For now, clears the DB whenever a dev refresh happens. Must be changed for prod
 */

import query from "./query";

import { account, accountModel, initialAccountInsert } from "./account.model";
import { codeFile, codeFileModel, intialFileInsert } from "./codeFile.model";
import {
  collection,
  collectionModel,
  initialCollectionInsert
} from "./collection.model";
import {
  collectionAccount,
  collectionAccountInsert,
  collectionAccountModel
} from "./collectionAccount.model";
import {
  collectionFile,
  collectionFileInsert,
  collectionFileModel
} from "./collectionFile.model";
import {
  fileAccount,
  fileAccountInsert,
  fileAccountModel
} from "./fileAccount.model";
import { fileTag, fileTagInsert, fileTagModel } from "./fileTag.model";
import { initialTagInsert, tag, tagModel } from "./tag.model";

const TABLES = [
  account,
  collection,
  collectionAccount,
  codeFile,
  collectionFile,
  fileAccount,
  tag,
  fileTag
];
const MODELS = [
  accountModel,
  collectionModel,
  collectionAccountModel,
  codeFileModel,
  collectionFileModel,
  fileAccountModel,
  tagModel,
  fileTagModel
];

// replaces tables if they exists
async function replaceTable(tables: string[], models: string[], callback: any) {
  for (let i = 0; i < tables.length; i++) {
    await callback(tables[i], models[i], tables, models);
  }
}

export async function startDB() {
  try {
    await query("SET FOREIGN_KEY_CHECKS=0");
  } catch (e) {
    console.log("Could not disable foreign keys");
  }

  await replaceTable(TABLES, MODELS, async (table: string, model: string) => {
    const template = `DROP TABLE IF EXISTS ${table}`;
    try {
      await query(template);
      await query(model);
    } catch (e) {
      console.error(e);
    }
  });

  try {
    await query("SET FOREIGN_KEY_CHECKS=1");
  } catch (e) {
    console.log("Could not re-enable foreign keys");
  }

  // insert init data
  try {
    await initialAccountInsert();
    await initialCollectionInsert();
    await intialFileInsert();
    await initialTagInsert();
    await collectionAccountInsert();
    await collectionFileInsert();
    await fileAccountInsert();
    await fileTagInsert();
  } catch (e) {
    console.log("StartDB Insert Error");
    console.log(e);
  }
}
