//importamos la base de datos para poder crear la conexion
import db from "../database/db.js";
//importamos dataypes para poder crear las columnas de la tabla
import { DataTypes } from "sequelize";
//definimos la entidad
const CuentaModel = db.define("cuentas", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImg: {
    type: DataTypes.STRING,
    defaultValue: "../images/default-profile-img.png",
  },
});

export default CuentaModel;
