import "./App.scss";
import Footer from "./features/Footer/Footer";
import Login from "./features/Login/Login";
import Home from "./features/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/Header/Navbar";
import AdministradorHome from "./features/Mantenedores/Administrador/AdministradorHome";
import AdministradorActualizarDatosDeCuenta from "./features/Mantenedores/Administrador/AdministradorActualizarDatosDeCuenta";
import AdministradorCrearCuentaRepartidor from "./features/Mantenedores/Administrador/AdministradorCrearCuentaRepartidor";
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
            path="/cuenta/administrador/:id/add/repartidor"
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
