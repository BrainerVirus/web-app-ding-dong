import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TipoUsuarioModel = db.define("Tipo_Usuario", {
  tipoUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default TipoUsuarioModel;
