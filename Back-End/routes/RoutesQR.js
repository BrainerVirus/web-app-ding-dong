import express from "express";
import { isAuthenticated } from "../controllers/CuentaController.js";
import {
  createQR,
  deleteQR,
  deleteQRByUserId,
  getAllQRs,
  getAllQRsByUserId,
  getQR,
  getQRByUserId,
  updateQR,
  updateQRByUserId,
} from "../controllers/QRController.js";

const routerQR = express.Router();

routerQR.get("/:id", isAuthenticated, getQR);
routerQR.get("/usuario/:id", isAuthenticated, getQRByUserId);
routerQR.get("/", isAuthenticated, getAllQRs);
routerQR.get("/usuario/all-qrs/:id", isAuthenticated, getAllQRsByUserId);
routerQR.post("/", isAuthenticated, createQR);
routerQR.put("/:id", isAuthenticated, updateQR);
routerQR.put("/usuario/:id", isAuthenticated, updateQRByUserId);
routerQR.delete("/:id", isAuthenticated, deleteQR);
routerQR.delete("/usuario/:id", isAuthenticated, deleteQRByUserId);

export default routerQR;
