//importamos la conexión a la base de datos
import db from "../database/db";
//importamos sequelize
import { DataTypes } from "sequelize";

const cuentaModel = db.define("cuentas", {
  user: { type: DataTypes.STRING },
  pass: { type: DataTypes.STRING },
});

export default cuentaModel;
