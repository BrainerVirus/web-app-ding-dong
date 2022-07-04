//importamos jwt para la autenticacion
import jwt from "jsonwebtoken";
//importamos bcrypt para encriptar las contraseñas
import bcrypt from "bcryptjs";
//importamos la libreria de cookies
import cookieParser from "cookie-parser";
// importamos el modelo
import CuentaModel from "../models/CuentaModel.js";
import multer from "multer";
import path from "path";
import { Console } from "console";
import e from "express";
//metodos del crud

// crear un registro
export const createCuenta = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const info = {
      user: req.body.user,
      password: hashedPassword,
      profileImg: req.file.path,
      usuarioId: req.body.usuarioId,
    };
    const cuenta = await CuentaModel.create(info);
    res.json({ message: "Cuenta creada correctamente", info });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createCuentaNoProfilePic = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const info = {
      user: req.body.user,
      password: hashedPassword,
      profileImg: req.body.profileImg,
      usuarioId: req.body.usuarioId,
    };
    const cuenta = await CuentaModel.create(info);
    res.json({ message: "Cuenta creada correctamente", info });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// mostrar un registro
export const getCuenta = async (req, res) => {
  try {
    const cuenta = await CuentaModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(cuenta[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getCuentaByUserId = async (req, res) => {
  try {
    const cuenta = await CuentaModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json(cuenta[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// mostrar todos los registros
export const getAllCuentas = async (req, res) => {
  try {
    const cuentas = await CuentaModel.findAll();
    console.log("estas son cookies: " + req.cookies.token);
    res.json(cuentas);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro
export const updateCuenta = async (req, res) => {
  try {
    const info = {
      user: req.body.user,
      password: req.body.password,
      profileImg: req.file.path,
    };
    const cuenta = await CuentaModel.update(info, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Cuenta actualizada correctamente", info });
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const updateCuentaByUserId = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const info = {
      user: req.body.user,
      password: hashedPassword,
      profileImg: req.file.path,
    };
    const infoKeepOldPassword = {
      user: req.body.user,
      profileImg: req.file.path,
    };
    const cuentaToFindForPassValidation = await CuentaModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    if (
      await bcrypt.compare(
        req.body.password,
        cuentaToFindForPassValidation[0].password
      )
    ) {
      const cuenta = await CuentaModel.update(infoKeepOldPassword, {
        where: {
          usuarioId: req.params.id,
        },
      });
    } else {
      const cuenta = await CuentaModel.update(info, {
        where: {
          usuarioId: req.params.id,
        },
      });
    }

    res.json({ message: "Cuenta actualizada correctamente", info });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro
export const deleteCuenta = async (req, res) => {
  try {
    const cuenta = await CuentaModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Cuenta eliminada correctamente", cuenta });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar cuenta segun user id
//eliminar un registro
export const deleteCuentaByUserId = async (req, res) => {
  try {
    const cuenta = await CuentaModel.destroy({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({
      message: "Cuenta eliminada por id de usuario correctamente",
      cuenta,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//metodos adicionales

//login
export const login = async (req, res) => {
  try {
    const cuenta = await CuentaModel.findAll({
      where: {
        user: req.body.email,
      },
    });
    // await CuentaModel.update(
    //   { isLogged: 1 },
    //   {
    //     where: {
    //       user: req.body.email,
    //       password: req.body.password,
    //     },
    //   }
    // );
    if (await bcrypt.compare(req.body.password, cuenta[0].password)) {
      const id = cuenta[0].usuarioId;
      const isLogged = true;
      const token = jwt.sign({ id, isLogged }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });
      //console.log("token: " + token + "usuario: " + cuenta[0].user);
      const cookiesOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
        path: "/",
      };

      console.log("cookies: " + cookiesOptions.expires);
      // res.json({
      //   login: true,
      //   token: token,
      //   user: cuenta[0].user,
      //   id: cuenta[0].id,
      //   password: cuenta[0].password,
      //   cookiesOptions: cookiesOptions,
      // });
      await CuentaModel.update(
        { isLogged: true },
        {
          where: {
            user: req.body.email,
          },
        }
      );
      console.log("sobre las cookies");
      res.cookie("token", token, cookiesOptions);
      console.log("entra a login: " + req.cookies.token);
      res.json({
        user: cuenta[0].user,
        id: cuenta[0].id,
        password: cuenta[0].password,
        usuarioId: cuenta[0].usuarioId,
        isLogged: true,
      });

      //res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getLoginStatus = async (req, res) => {
  console.log("entra a getLoginStatus");
  if (req.cookies.token) {
    console.log("entra a getLoginStatus");
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      const cuenta = await CuentaModel.findAll({
        where: {
          id: decoded.id,
        },
      });
      console.log("entra a getLoginStatus");
      console.log("getLoginStatus id: " + decoded.id);
      console.log("getLoginStatus isLogged: " + decoded.isLogged);
      const loginStatus = {
        isLogged: decoded.isLogged,
        id: decoded.id,
      };
      res.json(loginStatus);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
};

// export const getLoginStatus = async (req, res) => {
//   try {
//     const cuentas = await CuentaModel.findAll();
//     console.log("estas son cookies: " + req.cookies.token);
//     res.json(cuentas);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

//img controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadImg = multer({
  storage: storage,
  limits: { fileSize: "35000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profileImg");

//autenticacion
export const isAuthenticated = async (req, res, next) => {
  console.log("entra a isAuthenticated");
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      const cuenta = await CuentaModel.findAll({
        where: {
          id: decoded.id,
        },
      });
      if (!res) {
        return next();
      }
      req.user = cuenta[0];
      console.log("entra a isAuthenticated");
      console.log("id: " + decoded.id);
      console.log("isLogged: " + decoded.isLogged);
      return next();
    } catch (error) {
      res.json({ message: error.message });
      return next();
    }
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.redirect("http://localhost:3000/");
  }
};

export const logout = async (req, res) => {
  try {
    await CuentaModel.update(
      { isLogged: false },
      {
        where: {
          usuarioId: req.body.usuarioId,
        },
      }
    );
    const cookiesOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: false,
      path: "/",
    };
    //console.log("entra a logout");
    //console.log("id que llega al logout: " + req.body.usuarioId);
    res.clearCookie("token");
    res.json({ message: "success" }).end();
    //console.log("logout correcto");
  } catch (error) {
    res.json({ message: error.message });
  }
};
