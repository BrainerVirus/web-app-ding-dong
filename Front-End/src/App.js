import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "./features/context/AuthContext";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";

import "./App.scss";
//Landing page
import Footer from "./features/Footer/Footer";
import Login from "./features/Login/Personas/Login";
import Home from "./features/Home/Home";
import Navbar from "./features/Header/Navbar";
//scrooling
import ScrollToTop from "./features/ScrollToTop/ScrollToTop";
//Administrador
import AdministradorHome from "./features/Mantenedores/Administrador/Home/AdministradorHome";
import AdministradorActualizarDatosDeCuentaAdmin from "./features/Mantenedores/Administrador/ActualizarDatosCuentaAdmin/ActualizarDatosDeCuentaAdmin";
import AdministradorCrearCuentaRepartidor from "./features/Mantenedores/Administrador/CrearCuentaRepartidor/CrearCuentaRepartidorAdmin";
import AdministradorActualizarCuentaRepartidor from "./features/Mantenedores/Administrador/ActualizarCuentaRepartidor/ActualizarCuentaRepartidorAdmin";
import AdministradorMostrarRepartidores from "./features/Mantenedores/Administrador/MostrarRepartidores/AdministradorMostrarRepartidores";
import LoginAdmin from "./features/Login/Empresas/LoginAdministrador";
import NavbarAdministrador from "./features/Mantenedores/Administrador/Header/NavbarAdministrador";

//Receptor
import RegisterReceptor from "./features/Register/Personas/RegisterReceptor";
import NavbarReceptor from "./features/Mantenedores/Receptor/Header/NavbarReceptor";
import HomeReceptor from "./features/Mantenedores/Receptor/Home/ReceptorHome";
import ActualizarDatosCuentaReceptor from "./features/Mantenedores/Receptor/ActualizarCuentaReceptor/ActualizarCuentaReceptor";
import MostrarPaquetesReceptor from "./features/Mantenedores/Receptor/MostrarPaquetes/ReceptorMostrarPaquetes";
//repartidor
import ActualizarDatosAccessoRepartidor from "./features/Mantenedores/Repartidor/ActualizarDatosDeAcceso/ActualizarDatosDeAccesoRepartidor";
import NavbarRepartidor from "./features/Mantenedores/Repartidor/Header/NavbarRepartidor";
import HomeRepartidor from "./features/Mantenedores/Repartidor/Home/RepartidorHome";
import MostrarCalificaciones from "./features/Mantenedores/Repartidor/MostrarCalificaciones/RepartidorMostrarCalificaciones";

const URI = "http://localhost:8080/cuentas/login/status";
const URITipoUsuario = "http://localhost:8080/tipoUsuario/usuario/";

function App() {
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [id, setId] = useState(null);
  const [role, setRole] = useState("");
  const [rolSwitch, setRolSwitch] = useState("");
  const roles = ["administrador", "receptor", "repartidor"];
  axios.defaults.withCredentials = false;
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  const getSession = async () => {
    try {
      const session = await axios.get(URI, config).then((res) => {
        axios.get(URITipoUsuario + res.data.id, config).then((response) => {
          localStorage.getItem("id");
          localStorage.getItem("tipoUsuario");
          localStorage.getItem("isLogged");
          localStorage.getItem("token");
          console.log(
            "Role localStorage: " + localStorage.getItem("tipoUsuario")
          );
          console.log(
            "isLogged localStorage: " + localStorage.getItem("isLogged")
          );
          console.log("Id localStorage: " + localStorage.getItem("id"));
          console.log("token localStorage: " + localStorage.getItem("token"));
        });
      });
    } catch (error) {
      console.log("App js no trae los datos");
    }
  };
  useEffect(() => {
    getSession();
    console.log("hay session");
    console.log("logged?: " + isLogged);
  }, []);
  useEffect(() => {
    console.log("props seteados en app js");
    console.log("user id por props: " + id);
    console.log("user rol por props: " + role);
    console.log("user status por props: " + isLogged);
    console.log("user token por props: " + token);
    const idLocal = localStorage.getItem("id");
    const roleLocal = localStorage.getItem("tipoUsuario");
    const isLoggedLocal = localStorage.getItem("isLogged");
    const tokenLocal = localStorage.getItem("token");
    setId(idLocal);
    setRole(roleLocal);
    setIsLogged(isLoggedLocal);
    setToken(tokenLocal);
  }, [id, role, isLogged, token]);

  return (
    <div className="App" id="App">
      <AuthProvider>
        <BrowserRouter>
          <Wrapper>
            <ScrollToTop>
              <Routes>
                {/* Public routes*/}
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
                <Route
                  path="/personas/receptor/register"
                  element={
                    <>
                      <Navbar />
                      <main>
                        <RegisterReceptor />
                      </main>
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/personas/login"
                  element={
                    <>
                      <Navbar />
                      <main>
                        <Login
                          changeId={(id) => {
                            setId(id);
                          }}
                          changeLogged={(isLogged) => {
                            setIsLogged(isLogged);
                          }}
                          changeRole={(role) => {
                            setRole(role);
                          }}
                          changeToken={(token) => {
                            setToken(token);
                          }}
                        />
                      </main>
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/empresas/login"
                  element={
                    <>
                      <Navbar />
                      <main>
                        <LoginAdmin
                          changeId={(id) => {
                            setId(id);
                          }}
                          changeLogged={(isLogged) => {
                            setIsLogged(isLogged);
                          }}
                          changeRole={(role) => {
                            setRole(role);
                          }}
                          changeToken={(token) => {
                            setToken(token);
                          }}
                        />
                      </main>
                      <Footer />
                    </>
                  }
                />
                {/* Private routes Admin*/}
                {isLogged && role === roles[0] && (
                  <>
                    <Route
                      path="/cuenta/administrador/home"
                      element={
                        <>
                          <NavbarAdministrador />
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
                          <NavbarAdministrador />
                          <main>
                            <AdministradorMostrarRepartidores
                              timestamp={new Date().toString()}
                            />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="/cuenta/administrador/add/repartidor"
                      element={
                        <>
                          <NavbarAdministrador />
                          <main>
                            <AdministradorCrearCuentaRepartidor />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="/cuenta/administrador/update/repartidor/:id"
                      element={
                        <>
                          <NavbarAdministrador />
                          <main>
                            <AdministradorActualizarCuentaRepartidor />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="/cuenta/administrador/update/:id"
                      element={
                        <>
                          <NavbarAdministrador />
                          <main>
                            <AdministradorActualizarDatosDeCuentaAdmin />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <Navigate to="/cuenta/administrador/home" replace />
                      }
                    />
                  </>
                )}
                {/* Private routes Receptor*/}
                {isLogged && role === roles[1] && (
                  <>
                    <Route
                      path="/cuenta/receptor/home"
                      element={
                        <>
                          <NavbarReceptor />
                          <main>
                            <HomeReceptor />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="/cuenta/receptor/list-packages"
                      element={
                        <>
                          <NavbarReceptor />
                          <main>
                            <MostrarPaquetesReceptor />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="/cuenta/receptor/update/:id"
                      element={
                        <>
                          <NavbarReceptor />
                          <main>
                            <ActualizarDatosCuentaReceptor />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/cuenta/receptor/home" replace />}
                    />
                  </>
                )}
                {/* Private routes Repartidor*/}
                {isLogged && role === roles[2] && (
                  <>
                    <Route
                      path="/cuenta/repartidor/home"
                      element={
                        <>
                          <NavbarRepartidor />
                          <main>
                            <HomeRepartidor />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="/cuenta/repartidor/calificaciones"
                      element={
                        <>
                          <NavbarRepartidor />
                          <main>
                            <MostrarCalificaciones />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="/cuenta/repartidor/update/:id"
                      element={
                        <>
                          <NavbarRepartidor />
                          <main>
                            <ActualizarDatosAccessoRepartidor />
                          </main>
                          <Footer />
                        </>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <Navigate to="/cuenta/repartidor/home" replace />
                      }
                    />
                  </>
                )}
              </Routes>
            </ScrollToTop>
          </Wrapper>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
