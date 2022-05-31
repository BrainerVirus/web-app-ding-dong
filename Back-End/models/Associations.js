import { Sequelize } from "sequelize";
import CuentaModel from "./CuentaModel.js";
import TipoUsuarioModel from "./TipoUsuarioModel.js";
import UsuarioModel from "./UsuarioModel.js";
import db from "../database/db.js";

UsuarioModel.hasOne(CuentaModel);

db.sync({ alter: true })
  .then(() => {
    console.log("tables associations updated");
  })
  .catch((err) => {
    console.log(err);
  });
