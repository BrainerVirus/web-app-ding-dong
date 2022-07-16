import express from "express";
import { isAuthenticated } from "../controllers/CuentaController.js";
import {
  createPaquete,
  deletePaquete,
  deletePaqueteByUserId,
  getAllPaquetes,
  getAllPaquetesByUserId,
  getPaquete,
  getPaqueteByUserId,
  updatePaquete,
  updatePaqueteByUserId,
} from "../controllers/PaqueteController.js";
import authController from "../controllers/AuthController.js";

const routerPaquete = express.Router();

routerPaquete.get("/:id", getPaquete);
routerPaquete.get("/usuario/:id", getPaqueteByUserId);
routerPaquete.get("/", getAllPaquetes);
routerPaquete.get("/usuario/all-packages/:id", getAllPaquetesByUserId);
routerPaquete.post("/", createPaquete);
routerPaquete.put("/:id", authController, updatePaquete);
routerPaquete.put("/usuario/:id", authController, updatePaqueteByUserId);
routerPaquete.delete("/:id", authController, deletePaquete);
routerPaquete.delete("/usuario/:id", authController, deletePaqueteByUserId);

export default routerPaquete;
