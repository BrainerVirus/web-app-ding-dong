import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UsuarioModel = db.define("Usuario", {
  run: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //recuerda eliminar el campo direccion en el digrama ER.
  //Recuerda cambiar el campo "DesactivarRegistro" a estado en el digrama ER
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default UsuarioModel;
