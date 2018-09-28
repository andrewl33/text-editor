// init database
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user:  'test',
  password: 'test',
  database: 'test'
});

const query = (text: any, params?: any): any => pool.query(text, params);

export default query;
