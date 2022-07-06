import express from "express";
import {
  createCuenta,
  createCuentaNoProfilePic,
  deleteCuenta,
  deleteCuentaByUserId,
  getAllCuentas,
  getCuenta,
  getCuentaByUserId,
  getLoginStatus,
  isAuthenticated,
  login,
  logout,
  updateCuenta,
  updateCuentaByUserId,
  updateCuentaByUserIdNoPic,
  uploadImg,
} from "../controllers/CuentaController.js";

const routerCuentas = express.Router();

routerCuentas.get("/", isAuthenticated, getAllCuentas);
routerCuentas.get("/:id", isAuthenticated, getCuenta);
routerCuentas.get("/usuario/:id", isAuthenticated, getCuentaByUserId);
routerCuentas.post("/", uploadImg, createCuenta);
routerCuentas.post("/register", createCuentaNoProfilePic);
routerCuentas.put("/:id", isAuthenticated, uploadImg, updateCuenta);
routerCuentas.put(
  "/usuario/:id",
  isAuthenticated,
  uploadImg,
  updateCuentaByUserId
);
routerCuentas.put(
  "/usuario/access-data/:id",
  uploadImg,
  updateCuentaByUserIdNoPic
);
routerCuentas.delete("/:id", isAuthenticated, deleteCuenta);
routerCuentas.delete("/usuario/:id", isAuthenticated, deleteCuentaByUserId);
routerCuentas.post("/login", login);
routerCuentas.get("/login/status", getLoginStatus);
routerCuentas.put("/logout/status", logout);

export default routerCuentas;
