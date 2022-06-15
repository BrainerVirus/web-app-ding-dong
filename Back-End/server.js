//importamos express para poder crear el servidor
import express from "express";
//importamos cors
import cors from "cors";
//importamos la base de datos
import db from "./database/db.js";
//importamos las rutas
import routerCuentas from "./routes/RoutesCuenta.js";
import routerTipoUsuario from "./routes/RoutesTipoUsuario.js";
import routerDireccion from "./routes/RoutesDireccion.js";
import routerUsuario from "./routes/RoutesUsuario.js";
//definimos app como una variable de express
const app = express();
//configuramos cors
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//routers
app.use("/cuentas", routerCuentas);
app.use("/tipoUsuario", routerTipoUsuario);
app.use("/usuario", routerUsuario);
app.use("/direccion", routerDireccion);
//static files
app.use("/images", express.static("./images"));

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
