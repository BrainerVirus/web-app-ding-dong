import jwt from "jsonwebtoken";
import CuentaModel from "../models/CuentaModel.js";
//autenticacion
const authController = async (req, res, next) => {
  console.log("entra a isAuthenticated");
  if (req.headers.authorization) {
    try {
      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      const cuenta = await CuentaModel.findAll({
        where: {
          id: decoded.id,
        },
      });
      if (!res) {
        return next();
      }
      req.user = cuenta[0];
      console.log(
        "entra a isAuthenticated en cuentaController, token: " +
          req.headers.authorization
      );
      console.log("id: " + decoded.id);
      console.log("isLogged: " + decoded.isLogged);
      return next();
    } catch (error) {
      res.json({ message: "no estas autenticado" });
      return next();
    }
  } else {
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS"
    // );
    // res.redirect("http://localhost:3000/");
    res.json({ message: "No estas autenticado" });
  }
};

export default authController;
