import * as mysql from "mysql2";

const pool = mysql.createPool({
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_leeandr",
  password: "7539",
  database: "cs340_leeandr"
});

export default (pool as any).promise();
