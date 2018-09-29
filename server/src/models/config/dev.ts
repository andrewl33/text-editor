import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user:  'test',
  password: 'test',
  database: 'test'
});


export default pool;