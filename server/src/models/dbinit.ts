/**
 * For now, clears the DB whenever a dev refresh happens. Must be changed for prod
 */

import query from './query';

import { code, codeModel } from './code.model';
import { account, accountModel } from './account.model';

const TABLES = [code, account];
const MODELS = [codeModel, accountModel];

// replaces tables if they exists
async function replaceTable(tables: string[], models: string[], callback: any) {
  for (let i = 0; i < tables.length; i++) {
    await callback(tables[i], models[i], tables, models);
  }
}

export function startDB() {
  replaceTable(TABLES, MODELS, async (table: string, model: string) => {
    // const template = `DO $do$ BEGIN IF (EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name='${table}'))THEN DROP TABLE ${table} CASCADE; END IF; END; $do$`
    const template = `DROP TABLE IF EXISTS ${table}`;
    try {
      await query(template);
      await query(model);
    } catch(e) {
      console.error(e);
    }
  })
}
