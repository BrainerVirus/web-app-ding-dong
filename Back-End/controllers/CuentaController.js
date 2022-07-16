//importamos jwt para la autenticacion
import jwt from "jsonwebtoken";
//importamos bcrypt para encriptar las contraseñas
import bcrypt from "bcryptjs";
// importamos el modelo
import CuentaModel from "../models/CuentaModel.js";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";

//conexcion con el bucket de aws s3
const s3 = new aws.S3({
  region: process.env.S3_REGION_PROFILE_IMG,
  accessKeyId: process.env.S3_KEY_PROFILE_IMG,
  secretAccessKey: process.env.S3_SECRET_PROFILE_IMG,
});

//metodos del crud

// crear un registro
export const createCuenta = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const info = {
      user: req.body.user,
      password: hashedPassword,
      profileImg: req.file.location,
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
export const getCuentaByMail = async (req, res) => {
  try {
    const cuenta = await CuentaModel.findAll({
      where: {
        user: req.params.user,
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
    console.log(
      "token del body desde getAllCuentas: " + req.headers.authorization
    );
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
      profileImg: req.file.location,
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
      profileImg: req.file.location,
    };
    const infoKeepOldPassword = {
      user: req.body.user,
      profileImg: req.file.location,
    };
    console.log("id por paramas en update: " + req.params.id);
    console.log("img req: ", req.file);
    console.log("info location: ", info.profileImg);

    const cuentaToFindForPassValidation = await CuentaModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    if (req.body.password === cuentaToFindForPassValidation[0].password) {
      const cuenta = await CuentaModel.update(infoKeepOldPassword, {
        where: {
          usuarioId: req.params.id,
        },
      });
      console.log("la password se mantiene igual");
    } else {
      console.log("la password se han actualizado");
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

export const updateCuentaByUserIdNoPic = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const info = {
      user: req.body.user,
      password: hashedPassword,
      profileImg: req.body.profileImg,
    };
    const infoKeepOldPassword = {
      user: req.body.user,
      profileImg: req.body.profileImg,
    };
    console.log("id por paramas en update: " + req.params.id);
    const cuentaToFindForPassValidation = await CuentaModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    if (req.body.password === cuentaToFindForPassValidation[0].password) {
      const cuenta = await CuentaModel.update(infoKeepOldPassword, {
        where: {
          usuarioId: req.params.id,
        },
      });
      console.log("la password se mantiene igual");
    } else {
      console.log("la password se han actualizado");
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
    if (await bcrypt.compare(req.body.password, cuenta[0].password)) {
      const id = cuenta[0].usuarioId;
      const isLogged = true;
      const token = jwt.sign({ id, isLogged }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });
      await CuentaModel.update(
        { isLogged: true },
        {
          where: {
            user: req.body.email,
          },
        }
      );
      res.json({
        user: cuenta[0].user,
        id: cuenta[0].id,
        password: cuenta[0].password,
        usuarioId: cuenta[0].usuarioId,
        isLogged: true,
        token: token,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getLoginStatus = async (req, res) => {
  console.log("entra a getLoginStatus");
  if (req.headers.authorization) {
    console.log("entra a getLoginStatus");
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

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

export const uploadImg = multer({
  storage: multerS3({
    s3,
    bucket: "profile-pictures-ding-dong-app",
    metadata: function (req, file, cb) {
      cb(null, { filename: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
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
      res.json({ message: error.message });
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
    res.json({ message: error.message });
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
    res.json({ message: "success" }).end();
    //console.log("logout correcto");
  } catch (error) {
    res.json({ message: error.message });
  }
};
