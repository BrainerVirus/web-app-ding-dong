import express from "express";
import {
  createCuenta,
  createCuentaNoProfilePic,
  deleteCuenta,
  deleteCuentaByUserId,
  getAllCuentas,
  getCuenta,
  login,
  updateCuenta,
  uploadImg,
} from "../controllers/CuentaController.js";

const routerCuentas = express.Router();

routerCuentas.get("/", getAllCuentas);
routerCuentas.get("/:id", getCuenta);
routerCuentas.post("/", uploadImg, createCuenta);
routerCuentas.post("/register", createCuentaNoProfilePic);
routerCuentas.put("/:id", uploadImg, updateCuenta);
routerCuentas.delete("/:id", deleteCuenta);
routerCuentas.delete("/usuario/:id", deleteCuentaByUserId);
routerCuentas.post("/login", login);

export default routerCuentas;
