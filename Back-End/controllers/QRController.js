import QRModel from "../models/QRModel.js";
//import DireccionModel from "../models/DireccionesModel.js";
import QRCode from "qrcode";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import fs from "fs";

//conexcion con el bucket de aws s3
const s3 = new aws.S3({
  region: process.env.S3_REGION_PROFILE_IMG,
  accessKeyId: process.env.S3_KEY_PROFILE_IMG,
  secretAccessKey: process.env.S3_SECRET_PROFILE_IMG,
});
//definiendo path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//crear un usurio

export const createQR = async (req, res) => {
  try {
    const info = {
      qr: req.body.qr,
      tipoQr: req.body.tipoQr,
      status: req.body.status,
      calle: req.body.calle,
      numCalle: req.body.numCalle,
      comuna: req.body.comuna,
      region: req.body.region,
      usuarioId: req.body.usuarioId,
      paqueteId: req.body.paqueteId,
    };
    const qr = await QRModel.create(info).then((response) => {
      response.tipoQr === "certificado"
        ? generateQRPackageValidation(req, response)
        : generateQRReceptorIdentityValidation(response);
      console.log("el id es: " + response.id);
      console.log("usuario id: " + response.usuarioId);
    });
    res.json({ message: "QR creado correctamente" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//Generar un QR para el receptor
const generateQRReceptorIdentityValidation = async (response) => {
  try {
    const qrPath = path.join(__dirname, "../QRCodes", "/ValidaciónReceptor/");
    console.log("el path es: " + qrPath);
    const content = JSON.stringify({
      id: response.id,
      tipoQr: response.tipoQr,
      usuarioId: response.usuarioId,
      paqueteId: response.paqueteId,
    });
    console.log("el contenido es: " + content);
    QRCode.toFile(
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
        const imgPath = path.join(
          __dirname,
          "../QRCodes",
          `/ValidaciónReceptor/${response.id}.png`
        );
        const tempImg = fs.readFileSync(imgPath);
        console.log("el temp es: ", tempImg);
        if (tempImg) {
          s3.putObject({
            Bucket: "qr-codes-ding-dong-app",
            Body: tempImg,
            Key: `${response.id}.png`,
          })
            .promise()
            .then((res) => {
              console.log(`Upload succeeded - `, res);
            })
            .catch((err) => {
              console.log("Upload failed:", err);
            });
          console.log("bajo s3 put object");
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};
//generar un QR para el Paquete
const generateQRPackageValidation = async (req, response) => {
  try {
    const qrPath = path.join("./QRCodes", "/CertificadoParaPaquetes/");
    console.log("el path es: " + qrPath);
    const content = JSON.stringify({
      id: response.id,
      tipoQr: response.tipoQr,
      usuarioId: response.usuarioId,
      paqueteId: response.paqueteId,
    });
    console.log("el contenido es: " + content);
    QRCode.toFile(
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
        const imgPath = path.join(
          __dirname,
          "../QRCodes",
          `/CertificadoParaPaquetes/${response.id}.png`
        );
        const tempImg = fs.readFileSync(imgPath);
        console.log("el temp es: ", tempImg);
        if (tempImg) {
          s3.putObject({
            Bucket: "qr-codes-ding-dong-app",
            Body: tempImg,
            Key: `${response.id}.png`,
          })
            .promise()
            .then((res) => {
              console.log(`Upload succeeded - `, res);
              // console.log(`Upload succeeded - `, req.file);
              // try {
              //   const info = {
              //     qr: res.file
              //   }
              //   await QRModel.update(req.body, {
              //     where: {
              //       id: response.id,
              //     },
              //   });
              //   res.json({ message: "QR actualizada correctamente" });
              // } catch (error) {
              //   res.json({ message: error.message });
              // }
            })
            .catch((err) => {
              console.log("Upload failed:", err);
            });
          console.log("bajo s3 put object");
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};

//mostrar un qr
export const getQR = async (req, res) => {
  try {
    const qr = await QRModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    s3.getObject(
      {
        Bucket: "qr-codes-ding-dong-app",
        Key: `${req.params.id}.png`,
      },
      (err, data) => {
        console.log("data del get qr: ", data.Body);
        if (err) {
          //callback(err, null);
        } else {
          let image = new Buffer(data.Body).toString("base64");
          console.log("qr en get : ", image);
          image = "data:" + data.ContentType + ";base64," + image;
          let response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": data.ContentType,
            },
            body: image,
            isBase64Encoded: true,
          };
          res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": data.ContentType,
          });
          res.write(image, "binary");
          res.end(null, "binary");
          //callback(null, response);
        }
      }
    );
    //res.json(qr[0]);
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
