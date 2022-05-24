//importamos el modelo
import cuentaModel from "../models/CuentaModel";

//metodos del crud

//crear cuenta
export const crearCuenta = async (req, res) => {
  try {
    await cuentaModel.create(req.body);
    res.json({ message: "Cuenta creada correctamente!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//mostrar datos de una cuenta
export const mostrarDatosDeCuenta = async (req, res) => {
  try {
    const cuenta = await cuentaModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(cuenta);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar cuentas
export const mostrarCuentas = async (req, res) => {
  try {
    const cuentas = await cuentaModel.findAll();
    res.json(cuentas);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar cuenta

export const actualizarCuenta = async (req, res) => {
  try {
    await cuentaModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Cuenta actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
