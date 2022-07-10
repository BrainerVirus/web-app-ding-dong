import express from "express";
import {
  getTipoUsuario,
  getAllTiposDeUsuario,
  createTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario,
  deleteTipoUsuarioByUserId,
  getTipoUsuarioByUserId,
  getAllRepartidores,
  createUsuarioReceptor,
  createUsuarioRepartidor,
} from "../controllers/TipoUsuarioController.js";
import authController from "../controllers/AuthController.js";

//Inicializamos el router
const routerTipoUsuario = express.Router();

//ruta para obtener un tipo de usuario
routerTipoUsuario.get("/:id", authController, getTipoUsuario);
routerTipoUsuario.get("/usuario/:id", getTipoUsuarioByUserId);
//ruta para obtener todos los tipos de usuarios
routerTipoUsuario.get("/", authController, getAllTiposDeUsuario);
routerTipoUsuario.get(
  "/show/list/repartidores",
  authController,
  getAllRepartidores
);
//ruta para crear un tipo de usuario
routerTipoUsuario.post("/", createTipoUsuario);
routerTipoUsuario.post("/register/receptor", createUsuarioReceptor);
routerTipoUsuario.post(
  "/register/repartidor",
  authController,
  createUsuarioRepartidor
);
//ruta para actualizar un tipo de usuario
routerTipoUsuario.put("/:id", authController, updateTipoUsuario);
//ruta para eliminar un tipo de usuario
routerTipoUsuario.delete("/:id", authController, deleteTipoUsuario);
routerTipoUsuario.delete(
  "/usuario/:id",
  authController,
  deleteTipoUsuarioByUserId
);

export default routerTipoUsuario;
