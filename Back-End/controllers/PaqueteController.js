import PaqueteModel from "../models/PaqueteModel.js";

//crear un usurio
export const createPaquete = async (req, res) => {
  try {
    await PaqueteModel.create(req.body);
    res.json({ message: "Paquete creado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un usuario
export const getPaquete = async (req, res) => {
  try {
    const paquete = await PaqueteModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(paquete[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getPaqueteByUserId = async (req, res) => {
  try {
    const paquete = await PaqueteModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json(paquete[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar todos los usuarios

export const getAllPaquetes = async (req, res) => {
  try {
    const paquetes = await PaqueteModel.findAll();
    res.json(paquetes);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getAllPaquetesByUserId = async (req, res) => {
  try {
    const paquetes = await PaqueteModel.findAll({
      where: { usuarioId: req.params.id },
    });
    res.json(paquetes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un usuario

export const updatePaquete = async (req, res) => {
  try {
    await PaqueteModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Paquete actualizado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const updatePaqueteByUserId = async (req, res) => {
  try {
    await PaqueteModel.update(req.body, {
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({ message: "Paquete actualizado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un usuario

export const deletePaquete = async (req, res) => {
  try {
    await PaqueteModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Paquete eliminado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar paquetes por usuario
export const deletePaqueteByUserId = async (req, res) => {
  try {
    const cuenta = await PaqueteModel.destroy({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({
      message: "Paquete eliminada por id de usuario correctamente",
      cuenta,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
