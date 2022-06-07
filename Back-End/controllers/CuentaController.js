// importamos el modelo
import CuentaModel from "../models/CuentaModel.js";

//metodos del crud

// crear un registro
export const createCuenta = async (req, res) => {
  try {
    const cuenta = await CuentaModel.create(req.body);
    res.json({ message: "Cuenta creada correctamente", cuenta });
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
    const cuenta = await CuentaModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Cuenta actualizada correctamente", cuenta });
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
