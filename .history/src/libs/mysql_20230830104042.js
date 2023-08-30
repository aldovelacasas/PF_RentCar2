import { configDotenv } from "dotenv";
import mysql from "serverless-mysql";

require(configDotenv());
const { DB_VALIDATION } = process.env;

export const conn = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: DB_VALIDATION,
    port: 3306,
    database: "nextmysqlcrud2",
  },
});
