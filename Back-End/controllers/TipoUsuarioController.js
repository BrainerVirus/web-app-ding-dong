import TipoUsuarioModel from "../models/TipoUsuarioModel.js";

//crear un tipo de usuario

export const createTipoUsuario = async (req, res) => {
  try {
    await TipoUsuarioModel.create(req.body);
    res.json({ message: "Tipo de usuario creado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un tipo de usuario
export const getTipoUsuario = async (req, res) => {
  try {
    const tipoUsuario = await TipoUsuarioModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(tipoUsuario[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getTipoUsuarioByUserId = async (req, res) => {
  try {
    const tipoUsuario = await TipoUsuarioModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json(tipoUsuario[0]);
    //console.log("tipo de usuario: " + tipoUsuario[0].tipoUsuario);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar todos los tipos de usuarios
export const getAllTiposDeUsuario = async (req, res) => {
  try {
    const tiposDeUsuario = await TipoUsuarioModel.findAll();
    res.json(tiposDeUsuario);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getAllRepartidores = async (req, res) => {
  try {
    const tiposDeUsuario = await TipoUsuarioModel.findAll({
      where: {
        tipoUsuario: "repartidor",
      },
    });
    res.json(tiposDeUsuario);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un tipo de usuario
export const updateTipoUsuario = async (req, res) => {
  try {
    await TipoUsuarioModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Tipo de usuario actualizado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un tipo de usuario
export const deleteTipoUsuario = async (req, res) => {
  try {
    await TipoUsuarioModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Tipo de usuario eliminado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un tipo de usuario por id de usuario
export const deleteTipoUsuarioByUserId = async (req, res) => {
  try {
    const cuenta = await TipoUsuarioModel.destroy({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({
      message: "Tipo de usuario eliminado por id de usuario correctamente",
      cuenta,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
