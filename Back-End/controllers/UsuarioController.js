import UsuarioModel from "../models/UsuarioModel";

//crear un usurio
export const createUsuario = async (req, res) => {
  try {
    await UsuarioModel.create(req.body);
    res.json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un usuario
export const getUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(usuario[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar todos los usuarios

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.findAll();
    res.json(usuarios);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un usuario

export const updateUsuario = async (req, res) => {
  try {
    await UsuarioModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un usuario

export const deleteUsuario = async (req, res) => {
  try {
    await UsuarioModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
