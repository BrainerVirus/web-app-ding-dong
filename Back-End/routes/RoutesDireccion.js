import express from "express";
import {
  createDireccion,
  deleteDireccion,
  deleteDireccionByUserId,
  getAllDirecciones,
  getDireccion,
  getDireccionByUserId,
  updateDireccion,
  updateDireccionByUserId,
} from "../controllers/DireccionController.js";
import authController from "../controllers/AuthController.js";

const routerDireccion = express.Router();

routerDireccion.get("/:id", authController, getDireccion);
routerDireccion.get("/usuario/:id", authController, getDireccionByUserId);
routerDireccion.get("/", authController, getAllDirecciones);
routerDireccion.post("/", createDireccion);
routerDireccion.put("/:id", authController, updateDireccion);
routerDireccion.put("/usuario/:id", authController, updateDireccionByUserId);
routerDireccion.delete("/:id", authController, deleteDireccion);
routerDireccion.delete("/usuario/:id", authController, deleteDireccionByUserId);

export default routerDireccion;
