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

const routerPaquete = express.Router();

routerPaquete.get("/:id", isAuthenticated, getPaquete);
routerPaquete.get("/usuario/:id", isAuthenticated, getPaqueteByUserId);
routerPaquete.get("/", isAuthenticated, getAllPaquetes);
routerPaquete.get(
  "/usuario/all-packages/:id",
  isAuthenticated,
  getAllPaquetesByUserId
);
routerPaquete.post("/", createPaquete);
routerPaquete.put("/:id", isAuthenticated, updatePaquete);
routerPaquete.put("/usuario/:id", isAuthenticated, updatePaqueteByUserId);
routerPaquete.delete("/:id", isAuthenticated, deletePaquete);
routerPaquete.delete("/usuario/:id", isAuthenticated, deletePaqueteByUserId);

export default routerPaquete;
