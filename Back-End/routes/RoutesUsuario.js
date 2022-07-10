import express from "express";
import {
  getUsuario,
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/UsuarioController.js";
import authController from "../controllers/AuthController.js";

const routerUsuario = express.Router();

routerUsuario.get("/:id", authController, getUsuario);
routerUsuario.get("/", authController, getAllUsuarios);
routerUsuario.post("/", createUsuario);
routerUsuario.put("/:id", authController, updateUsuario);
routerUsuario.delete("/:id", authController, deleteUsuario);

export default routerUsuario;
