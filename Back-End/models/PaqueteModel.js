//importamos la base de datos para poder crear la conexion
import db from "../database/db.js";
//importamos dataypes para poder crear las columnas de la tabla
import { DataTypes } from "sequelize";
//definimos la entidad
const PaqueteModel = db.define("paquetes", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default PaqueteModel;
