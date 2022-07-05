import db from "../database/db.js";
import { DataTypes } from "sequelize";
import CuentaModel from "./CuentaModel.js";
import TipoUsuarioModel from "./TipoUsuarioModel.js";
import DireccionModel from "./DireccionesModel.js";
import PaqueteModel from "./PaqueteModel.js";
import QRModel from "./QRModel.js";

const UsuarioModel = db.define("usuarios", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  run: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notNull: true,
      isDate: true,
    },
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
//nuevas tablas
UsuarioModel.hasMany(PaqueteModel, {
  foreignKey: {
    type: DataTypes.UUID,
    //allowNull: false,
  },
});
PaqueteModel.belongsTo(UsuarioModel);

UsuarioModel.hasMany(QRModel, {
  foreignKey: {
    type: DataTypes.UUID,
    //allowNull: false,
  },
});
QRModel.belongsTo(UsuarioModel);

PaqueteModel.hasOne(QRModel, {
  foreignKey: {
    type: DataTypes.UUID,
    //allowNull: false,
  },
});

//sincronizamos la base de datos
db.sync();
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
// nuevas tablas
PaqueteModel.sync({ alter: true }).then(() => {
  console.log("working on table paquete");
});

QRModel.sync({ alter: true }).then(() => {
  console.log("working on table qr");
});

export default UsuarioModel;
