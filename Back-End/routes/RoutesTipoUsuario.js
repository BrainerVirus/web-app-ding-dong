import express from "express";
import { isAuthenticated } from "../controllers/CuentaController.js";
import {
  getTipoUsuario,
  getAllTiposDeUsuario,
  createTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario,
  deleteTipoUsuarioByUserId,
  getTipoUsuarioByUserId,
  getAllRepartidores,
} from "../controllers/TipoUsuarioController.js";

//Inicializamos el router
const routerTipoUsuario = express.Router();

//ruta para obtener un tipo de usuario
routerTipoUsuario.get("/:id", isAuthenticated, getTipoUsuario);
routerTipoUsuario.get("/usuario/:id", isAuthenticated, getTipoUsuarioByUserId);
//ruta para obtener todos los tipos de usuarios
routerTipoUsuario.get("/", isAuthenticated, getAllTiposDeUsuario);
routerTipoUsuario.get(
  "/show/list/repartidores",
  isAuthenticated,
  getAllRepartidores
);
//ruta para crear un tipo de usuario
routerTipoUsuario.post("/", createTipoUsuario);
//ruta para actualizar un tipo de usuario
routerTipoUsuario.put("/:id", isAuthenticated, updateTipoUsuario);
//ruta para eliminar un tipo de usuario
routerTipoUsuario.delete("/:id", isAuthenticated, deleteTipoUsuario);
routerTipoUsuario.delete(
  "/usuario/:id",
  isAuthenticated,
  deleteTipoUsuarioByUserId
);

export default routerTipoUsuario;
