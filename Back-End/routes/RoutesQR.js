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

routerQR.get("/:id", authController, getQR);
routerQR.get("/usuario/:id", authController, getQRByUserId);
routerQR.get("/", authController, getAllQRs);
routerQR.get("/usuario/all-qrs/:id", authController, getAllQRsByUserId);
routerQR.post("/", authController, createQR);
routerQR.put("/:id", authController, updateQR);
routerQR.put("/usuario/:id", authController, updateQRByUserId);
routerQR.delete("/:id", authController, deleteQR);
routerQR.delete("/usuario/:id", authController, deleteQRByUserId);

export default routerQR;
