import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CuentaModel from "./CuentaModel.js";
import TipoUsuarioModel from "./TipoUsuarioModel.js";
import DireccionModel from "./DireccionesModel.js";

const UsuarioModel = db.define("usuarios", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  run: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  //recuerda eliminar el campo direccion en el digrama ER.
  //Recuerda cambiar el campo "DesactivarRegistro" a estado en el digrama ER
});

//asociaciones
UsuarioModel.hasOne(CuentaModel, {
  foreignKey: {
    type: DataTypes.UUID,
    //allowNull: false,
  },
});
CuentaModel.belongsTo(UsuarioModel);

UsuarioModel.hasOne(TipoUsuarioModel, {
  foreignKey: {
    type: DataTypes.UUID,
    //allowNull: false,
  },
});
TipoUsuarioModel.belongsTo(UsuarioModel);

UsuarioModel.hasOne(DireccionModel, {
  foreignKey: {
    type: DataTypes.UUID,
    //allowNull: false,
  },
});
DireccionModel.belongsTo(UsuarioModel);

//sincronizamos la base de datos
UsuarioModel.sync({
  alter: true,
}).then(() => {
  console.log("working on table usuarios");
});

CuentaModel.sync({ alter: true }).then(() => {
  console.log("working on table cuenta");
});

TipoUsuarioModel.sync({ alter: true }).then(() => {
  console.log("working on table tipo_usuario");
});

DireccionModel.sync({ alter: true }).then(() => {
  console.log("working on table direccion");
});

export default UsuarioModel;
