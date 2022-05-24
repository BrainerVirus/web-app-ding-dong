import { Sequelize } from "sequelize";

const db = new Sequelize("dingdong", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
