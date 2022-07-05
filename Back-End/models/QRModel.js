//importamos la base de datos para poder crear la conexion
import db from "../database/db.js";
//importamos dataypes para poder crear las columnas de la tabla
import { DataTypes } from "sequelize";
//definimos la entidad
const QRModel = db.define(
  "codigos_qr",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    qr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoQr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "codigos_qr",
  }
);
export default QRModel;
