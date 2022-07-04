import express from "express";
import { isAuthenticated } from "../controllers/CuentaController.js";
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

const routerDireccion = express.Router();

routerDireccion.get("/:id", isAuthenticated, getDireccion);
routerDireccion.get("/usuario/:id", isAuthenticated, getDireccionByUserId);
routerDireccion.get("/", isAuthenticated, getAllDirecciones);
routerDireccion.post("/", createDireccion);
routerDireccion.put("/:id", isAuthenticated, updateDireccion);
routerDireccion.put("/usuario/:id", isAuthenticated, updateDireccionByUserId);
routerDireccion.delete("/:id", isAuthenticated, deleteDireccion);
routerDireccion.delete(
  "/usuario/:id",
  isAuthenticated,
  deleteDireccionByUserId
);

export default routerDireccion;
