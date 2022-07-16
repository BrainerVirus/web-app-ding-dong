import express from "express";
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
import authController from "../controllers/AuthController.js";

const routerQR = express.Router();

routerQR.get("/:id", getQR);
routerQR.get("/usuario/:id", getQRByUserId);
routerQR.get("/", getAllQRs);
routerQR.get("/usuario/all-qrs/:id", getAllQRsByUserId);
routerQR.post("/", createQR);
routerQR.put("/:id", authController, updateQR);
routerQR.put("/usuario/:id", authController, updateQRByUserId);
routerQR.delete("/:id", authController, deleteQR);
routerQR.delete("/usuario/:id", authController, deleteQRByUserId);

export default routerQR;
