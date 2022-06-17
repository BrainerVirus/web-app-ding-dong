// importamos el modelo
import CuentaModel from "../models/CuentaModel.js";
import multer from "multer";
import path from "path";
//metodos del crud

// crear un registro
export const createCuenta = async (req, res) => {
  try {
    const info = {
      user: req.body.user,
      password: req.body.password,
      profileImg: req.file.path,
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

// mostrar todos los registros
export const getAllCuentas = async (req, res) => {
  try {
    const cuentas = await CuentaModel.findAll();
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

//metodos adicionales

//login
export const login = async (req, res) => {
  try {
    const cuenta = await CuentaModel.findAll({
      where: {
        user: req.body.email,
        password: req.body.password,
      },
    });
    await CuentaModel.update(
      { isLogged: 1 },
      {
        where: {
          user: req.body.email,
          password: req.body.password,
        },
      }
    );
    res.json(cuenta[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

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
