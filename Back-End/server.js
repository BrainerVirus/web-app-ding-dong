//importamos la base de datos
import db from "./database/db.js";
//importamos express para poder crear el servidor
import express from "express";
//importamos cors
import cors from "cors";
//importamos dotenv para poder leer el archivo .env
// import dotenv from "dotenv";
//variables de entorno
// dotenv.config({ path: "./.env" });

//importamos las rutas
import routerCuentas from "./routes/RoutesCuenta.js";
import routerTipoUsuario from "./routes/RoutesTipoUsuario.js";
import routerDireccion from "./routes/RoutesDireccion.js";
import routerUsuario from "./routes/RoutesUsuario.js";
import routerPaquete from "./routes/RoutesPaquete.js";
import routerQR from "./routes/RoutesQR.js";
//definimos app como una variable de express
const app = express();
//configuramos cors
app.use(
  cors({
    origin: "*",
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
//para poder procesar los datos que vienen del formulario
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//routers
console.log("test dotenv: " + process.env.DB_HOST);
app.use("/cuentas", routerCuentas);
app.use("/tipoUsuario", routerTipoUsuario);
app.use("/usuario", routerUsuario);
app.use("/direccion", routerDireccion);
app.use("/paquete", routerPaquete);
app.use("/qr", routerQR);
//static files
app.use("/images", express.static("./images"));
app.use("/qr/certificado", express.static("./QRCodes/CertificadoParaPaquetes"));
app.use("/qr/identidad", express.static("./QRCodes/ValidaciónReceptor"));

//test db
try {
  await db.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  console.log("Error al conectar con la base de datos");
}
//db.sync();
//probamos que el servidor este funcinando bien
/*app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});*/
//definos el puerto en el que va a correr el servidor
const port = 8080;
//definos un listener para escuchar el puerto
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
