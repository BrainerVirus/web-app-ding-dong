import express from "express";
import {
  createCuenta,
  deleteCuenta,
  getAllCuentas,
  getCuenta,
  login,
  updateCuenta,
} from "../controllers/CuentaController.js";

const routerCuentas = express.Router();

routerCuentas.get("/", getAllCuentas);
routerCuentas.get("/:id", getCuenta);
routerCuentas.post("/", createCuenta);
routerCuentas.put("/:id", updateCuenta);
routerCuentas.delete("/:id", deleteCuenta);
routerCuentas.post("/login", login);

export default routerCuentas;
