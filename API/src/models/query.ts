// init database
import pool from "./config/dev";

const query = (text: string, params?: string[]) => pool.query(text, params);

export default query;
