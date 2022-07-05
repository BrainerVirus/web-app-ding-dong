import QRModel from "../models/QRModel.js";
import QRCode from "qrcode";
import path from "path";
//crear un usurio
export const createQR = async (req, res) => {
  try {
    const qr = await QRModel.create(req.body).then((response) => {
      generateQRReceptorIdentityValidation(response);
      console.log("el id es: " + response.id);
    });
    res.json({ message: "QR creado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const generateQRReceptorIdentityValidation = async (response) => {
  try {
    const qrPath = path.join("./QRCodes", "/ValidaciónReceptor/");
    const content = JSON.stringify({
      id: response.id,
      tipoQr: response.tipoQr,
      usuarioId: response.usuarioId,
      paqueteId: response.paqueteId,
    });
    console.log("el contenido es: " + content);
    await QRCode.toFile(
      `${qrPath}${response.id}.png`,
      content,
      {
        scale: 10,
        color: {
          dark: "#000", // Blue dots
          light: "#fff", // Transparent background
        },
      },
      function (err) {
        if (err) throw err;
        console.log("done");
      }
    );
  } catch (err) {
    console.error(err);
  }
};

//mostrar un usuario
export const getQR = async (req, res) => {
  try {
    const qr = await QRModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(qr[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getQRByUserId = async (req, res) => {
  try {
    const qr = await QRModel.findAll({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json(qr[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar todos los usuarios

export const getAllQRs = async (req, res) => {
  try {
    const qrs = await QRModel.findAll();
    res.json(qrs);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getAllQRsByUserId = async (req, res) => {
  try {
    const qrs = await QRModel.findAll({ where: { usuarioId: req.params.id } });
    res.json(qrs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un usuario

export const updateQR = async (req, res) => {
  try {
    await QRModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "QR actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const updateQRByUserId = async (req, res) => {
  try {
    await QRModel.update(req.body, {
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({ message: "QR actualizada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un usuario

export const deleteQR = async (req, res) => {
  try {
    await QRModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "QR eliminada correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar QR por usuario
export const deleteQRByUserId = async (req, res) => {
  try {
    const cuenta = await QRModel.destroy({
      where: {
        usuarioId: req.params.id,
      },
    });
    res.json({
      message: "QR eliminada por id de usuario correctamente",
      cuenta,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
