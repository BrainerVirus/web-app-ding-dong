import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "./features/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./App.scss";
import Footer from "./features/Footer/Footer";
import Login from "./features/Login/Personas/Login";
import Home from "./features/Home/Home";
import Navbar from "./features/Header/Navbar";
import AdministradorHome from "./features/Mantenedores/Administrador/Home/AdministradorHome";
import AdministradorActualizarDatosDeCuentaAdmin from "./features/Mantenedores/Administrador/ActualizarDatosCuentaAdmin/ActualizarDatosDeCuentaAdmin";
import AdministradorCrearCuentaRepartidor from "./features/Mantenedores/Administrador/CrearCuentaRepartidor/CrearCuentaRepartidorAdmin";
import AdministradorActualizarCuentaRepartidor from "./features/Mantenedores/Administrador/ActualizarCuentaRepartidor/ActualizarCuentaRepartidorAdmin";
import AdministradorMostrarRepartidores from "./features/Mantenedores/Administrador/MostrarRepartidores/AdministradorMostrarRepartidores";
import RegisterReceptor from "./features/Register/Personas/RegisterReceptor";
import LoginAdmin from "./features/Login/Empresas/LoginAdministrador";
import NavbarAdministrador from "./features/Mantenedores/Administrador/Header/NavbarAdministrador";
import ScrollToTop from "./features/ScrollToTop/ScrollToTop";

const URI = "http://localhost:8080/cuentas/login/status";
const URITipoUsuario = "http://localhost:8080/tipoUsuario/usuario/";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [id, setId] = useState(null);
  const [role, setRole] = useState("");
  const [rolSwitch, setRolSwitch] = useState("");
  const roles = ["administrador", "receptor", "repartidor"];

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  axios.defaults.withCredentials = true;
  const getSession = async () => {
    try {
      const session = await axios
        .get(URI, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          axios.get(URITipoUsuario + res.data.id).then((response) => {
            localStorage.getItem("id");
            localStorage.getItem("tipoUsuario");
            localStorage.getItem("isLogged");
            console.log(
              "Role localStorage: " + localStorage.getItem("tipoUsuario")
            );
            console.log(
              "isLogged localStorage: " + localStorage.getItem("isLogged")
            );
            console.log("Id localStorage: " + localStorage.getItem("id"));
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
    const idLocal = localStorage.getItem("id");
    const roleLocal = localStorage.getItem("tipoUsuario");
    const isLoggedLocal = localStorage.getItem("isLogged");
    setId(idLocal);
    setRole(roleLocal);
    setIsLogged(isLoggedLocal);
  }, [id, role, isLogged]);

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
                        <Login />
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
                      path="/cuenta/administrador/:id/update"
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
                    <Route path="*" element={<Navigate to="/" replace />} />
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
