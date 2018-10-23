// import { Pool } from 'pg';

// const pool = new Pool({
//   host: 'localhost',
//   user:  'test',
//   password: 'test',
//   database: 'test'
// });

// // tcp: 3306

// export default pool;

import * as mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "test",
  password: "test",
  database: "test"
});

export default (pool as any).promise();
