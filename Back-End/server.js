//importamos express para poder crear el servidor
import express from "express";
//importamos cors
import cors from "cors";
//importamos la base de datos
import db from "./database/db.js";
//importamos las rutas
import routerCuentas from "./routes/RoutesCuenta.js";
import routerTipoUsuario from "./routes/RoutesTipoUsuario.js";
//definimos app como una variable de express
const app = express();
//configuramos cors
app.use(cors());
app.use(express.json());
app.use("/cuentas", routerCuentas);
app.use("/cuentas/tipoUsuario", routerTipoUsuario);

try {
  await db.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  console.log("Error al conectar con la base de datos");
}
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
