import "./App.scss";
import Footer from "./features/Footer/Footer";
import Login from "./features/Login/Login";
import Home from "./features/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/Header/Navbar";
import AdministradorHome from "./features/Mantenedores/Administrador/AdministradorHome";
import AdministradorActualizarDatosDeCuenta from "./features/Mantenedores/Administrador/AdministradorActualizarDatosDeCuenta";
import AdministradorCrearCuentaRepartidor from "./features/Mantenedores/Administrador/AdministradorCrearCuentaRepartidor";
import AdministradorActualizarCuentaRepartidor from "./features/Mantenedores/Administrador/AdministradorActualizarCuentaRepartidor";
import AdministradorMostrarRepartidores from "./features/Mantenedores/Administrador/AdministradorMostrarRepartidores";
function App() {
  return (
    <div className="App" id="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/cuenta/administrador"
            element={
              <>
                <Navbar />
                <main>
                  <AdministradorHome />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/cuenta/administrador/list-repartidores"
            element={
              <>
                <Navbar />
                <main>
                  <AdministradorMostrarRepartidores />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/cuenta/administrador/add/repartidor"
            element={
              <>
                <Navbar />
                <main>
                  <AdministradorCrearCuentaRepartidor />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/cuenta/administrador/:id/update/repartidor/:id"
            element={
              <>
                <Navbar />
                <main>
                  <AdministradorActualizarCuentaRepartidor />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/cuenta/administrador/:id/update"
            element={
              <>
                <Navbar />
                <main>
                  <AdministradorActualizarDatosDeCuenta />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
