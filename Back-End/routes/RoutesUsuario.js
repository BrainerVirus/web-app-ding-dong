import express from "express";
import {
  getUsuario,
  getAllUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/UsuarioController.js";

const routerUsuario = express.Router();

routerUsuario.get("/:id", getUsuario);
routerUsuario.get("/", getAllUsuarios);
routerUsuario.post("/", createUsuario);
routerUsuario.put("/:id", updateUsuario);
routerUsuario.delete("/:id", deleteUsuario);

export default routerUsuario;
