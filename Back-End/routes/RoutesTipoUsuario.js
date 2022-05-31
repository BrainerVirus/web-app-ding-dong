import express from "express";
import {
  getTipoUsuario,
  getAllTiposDeUsuario,
  createTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario,
} from "../controllers/TipoUsuarioController.js";

//Inicializamos el router
const routerTipoUsuario = express.Router();

//ruta para obtener un tipo de usuario
routerTipoUsuario.get("/:id", getTipoUsuario);
//ruta para obtener todos los tipos de usuarios
routerTipoUsuario.get("/", getAllTiposDeUsuario);
//ruta para crear un tipo de usuario
routerTipoUsuario.post("/", createTipoUsuario);
//ruta para actualizar un tipo de usuario
routerTipoUsuario.put("/:id", updateTipoUsuario);
//ruta para eliminar un tipo de usuario
routerTipoUsuario.delete("/:id", deleteTipoUsuario);

export default routerTipoUsuario;
