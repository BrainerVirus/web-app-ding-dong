import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TipoUsuarioModel = db.define("tipos_usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tipoUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default TipoUsuarioModel;
