//importamos la base de datos para poder crear la conexion
import db from "../database/db.js";
//importamos dataypes para poder crear las columnas de la tabla
import { DataTypes } from "sequelize";
//definimos la entidad
const CuentaModel = db.define("cuenta", {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default CuentaModel;
