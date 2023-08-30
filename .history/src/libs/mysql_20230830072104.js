import mysql from "serverless-mysql";

const { DB_VALIDATION } = process.env;
console.log(process.env);

export const conn = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: DB_VALIDATION,
    port: 3306,
    database: "nextmysqlcrud2",
  },
});
