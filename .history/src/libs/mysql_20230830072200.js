import mysql from "serverless-mysql";

const { DB_VALIDATION } = "naruto251";

export const conn = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: DB_VALIDATION,
    port: 3306,
    database: "nextmysqlcrud2",
  },
});
