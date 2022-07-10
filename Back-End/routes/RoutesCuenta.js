import express from "express";
import {
  createCuenta,
  createCuentaNoProfilePic,
  deleteCuenta,
  deleteCuentaByUserId,
  getAllCuentas,
  getCuenta,
  getCuentaByMail,
  getCuentaByUserId,
  getLoginStatus,
  login,
  logout,
  updateCuenta,
  updateCuentaByUserId,
  isAuthenticated,
  updateCuentaByUserIdNoPic,
  uploadImg,
} from "../controllers/CuentaController.js";

import authController from "../controllers/AuthController.js";

const routerCuentas = express.Router();

routerCuentas.get("/", authController, getAllCuentas);
routerCuentas.get("/:id", authController, getCuenta);
routerCuentas.get("/usuario/:id", authController, getCuentaByUserId);
routerCuentas.get(
  "/register/verify/mail/:user",
  authController,
  getCuentaByMail
);
routerCuentas.post("/", uploadImg, createCuenta);
routerCuentas.post("/register", createCuentaNoProfilePic);
routerCuentas.put("/:id", authController, uploadImg, updateCuenta);
routerCuentas.put(
  "/usuario/update/:id",
  authController,
  uploadImg,
  updateCuentaByUserId
);
routerCuentas.put(
  "/usuario/access-data/:id",
  authController,
  uploadImg,
  updateCuentaByUserIdNoPic
);
routerCuentas.delete("/:id", authController, deleteCuenta);
routerCuentas.delete("/usuario/:id", authController, deleteCuentaByUserId);
routerCuentas.post("/login", login);
routerCuentas.get("/login/status", getLoginStatus);
routerCuentas.put("/logout/status", authController, logout);

export default routerCuentas;
