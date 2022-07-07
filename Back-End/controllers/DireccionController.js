import DireccionModel from "../models/DireccionesModel.js";

//crear un usurio
export const createDireccion = async (req, res) => {
  try {
    await DireccionModel.create(req.body);
    res.json({ message: "Direccion creada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un usuario
export const getDireccion = async (req, res) => {
  try {
    const direccion = await DireccionModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(direccion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getDireccionByUserId = async (req, res) => {
  try {
    const direccion = await DireccionModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json(direccion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getDireccionByUserIdBodyReq = async (req, res) => {
  try {
    const direccion = await DireccionModel.findAll({
      where: {
        usuarioId: req.body.id,
      },
    });
    res.json(direccion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar todos los usuarios

export const getAllDirecciones = async (req, res) => {
  try {
    const direcciones = await DireccionModel.findAll();
    res.json(direcciones);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un usuario

export const updateDireccion = async (req, res) => {
  try {
    await DireccionModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Direccion actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const updateDireccionByUserId = async (req, res) => {
  try {
    await DireccionModel.update(req.body, {
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({ message: "Direccion actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un usuario

export const deleteDireccion = async (req, res) => {
  try {
    await DireccionModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Direccion eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar direcciones por usuario
export const deleteDireccionByUserId = async (req, res) => {
  try {
    const cuenta = await DireccionModel.destroy({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({
      message: "Direccion eliminada por id de usuario correctamente",
      cuenta,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
