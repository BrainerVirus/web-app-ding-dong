import express from "express";
import {
  createCuenta,
  createCuentaNoProfilePic,
  deleteCuenta,
  deleteCuentaByUserId,
  getAllCuentas,
  getCuenta,
  getLoginStatus,
  isAuthenticated,
  login,
  logout,
  updateCuenta,
  uploadImg,
} from "../controllers/CuentaController.js";

const routerCuentas = express.Router();

routerCuentas.get("/", isAuthenticated, getAllCuentas);
routerCuentas.get("/:id", getCuenta);
routerCuentas.post("/", uploadImg, createCuenta);
routerCuentas.post("/register", createCuentaNoProfilePic);
routerCuentas.put("/:id", uploadImg, updateCuenta);
routerCuentas.delete("/:id", deleteCuenta);
routerCuentas.delete("/usuario/:id", isAuthenticated, deleteCuentaByUserId);
routerCuentas.post("/login", login);
routerCuentas.get("/login/status", getLoginStatus);
routerCuentas.put("/logout/status", logout);

export default routerCuentas;
