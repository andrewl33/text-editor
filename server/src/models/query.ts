// init database
// import pool from "./config/dev";
import pool from "./config/school";

const query = (text: string, params?: string[]) => pool.query(text, params);

export default query;
