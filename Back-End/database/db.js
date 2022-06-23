import dotenv from "dotenv";
//variables de entorno
dotenv.config({ path: "./.env" });
//importamos sequelize para poder crear la conexion con la base de datos
import { Sequelize } from "sequelize";
//importamos dotenv para poder leer el archivo .env
//creo la conexion con la base de datos
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      paranoid: true,
    },
  }
);
export default db;
console.log("test dotenv en db file: " + process.env.DB_HOST);
