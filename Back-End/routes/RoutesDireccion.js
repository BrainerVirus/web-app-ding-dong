import express from "express";
import {
  createDireccion,
  deleteDireccion,
  deleteDireccionByUserId,
  getAllDirecciones,
  getDireccion,
  updateDireccion,
} from "../controllers/DireccionController.js";

const routerDireccion = express.Router();

routerDireccion.get("/:id", getDireccion);
routerDireccion.get("/", getAllDirecciones);
routerDireccion.post("/", createDireccion);
routerDireccion.put("/:id", updateDireccion);
routerDireccion.delete("/:id", deleteDireccion);
routerDireccion.delete("/usuario/:id", deleteDireccionByUserId);

export default routerDireccion;
