/**
 * For now, clears the DB whenever a dev refresh happens. Must be changed for prod
 */

import query from '.';

const TABLES = ['code'];
const MODELS = [
  `CREATE TABLE code (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) not null,
    date date not null,
    isLocked boolean not null,
    codeText text
  )`.replace(/\n/gm,"")
];

async function replaceTable(tables: any, models: any, callback: any) {
  for (let i = 0; i < tables.length; i++) {
    await callback(tables[i], models[i], tables, models);
  }
}

export default function startDB() {
  replaceTable(TABLES, MODELS, async (table: string, model: string) => {
    const template = `DO $do$ BEGIN IF (EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name='${table}'))THEN DROP TABLE ${table} CASCADE; END IF; END; $do$`
    try {
      await query(template);
      await query(model);
    } catch(e) {
      console.error(e);
    }
  })
}
