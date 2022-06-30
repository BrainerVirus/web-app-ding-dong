import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "./features/context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

import "./App.scss";
import Footer from "./features/Footer/Footer";
import Login from "./features/Login/Login";
import Home from "./features/Home/Home";
import Navbar from "./features/Header/Navbar";
import AdministradorHome from "./features/Mantenedores/Administrador/AdministradorHome";
import AdministradorActualizarDatosDeCuenta from "./features/Mantenedores/Administrador/AdministradorActualizarDatosDeCuenta";
import AdministradorCrearCuentaRepartidor from "./features/Mantenedores/Administrador/AdministradorCrearCuentaRepartidor";
import AdministradorActualizarCuentaRepartidor from "./features/Mantenedores/Administrador/AdministradorActualizarCuentaRepartidor";
import AdministradorMostrarRepartidores from "./features/Mantenedores/Administrador/AdministradorMostrarRepartidores";
import Register from "./features/Login/Register";
import LoginAdmin from "./features/Login/LoginAdministrador";
import NavbarAdministrador from "./features/Header/NavbarAdministrador";

const URI = "http://localhost:8080/cuentas/login/status";
const URITipoUsuario = "http://localhost:8080/tipoUsuario/usuario/";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [id, setId] = useState(null);
  const [role, setRole] = useState("");
  const [rolSwitch, setRolSwitch] = useState("");
  const roles = ["administrador", "receptor", "repartidor"];
  axios.defaults.withCredentials = true;
  const getSession = async () => {
    try {
      const session = await axios
        .get(URI, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          // console.log(
          //   "id session: " + res.data.id + " isLogged: " + res.data.isLogged
          // );
          //setIsLogged(res.data.isLogged);
          //setId(res.data.id);
          // const loginSession = {
          //   id: res.data.id,
          //   isLogged: res.data.isLogged,
          // };
          // console.log("id seteada: " + loginSession.id);
          axios.get(URITipoUsuario + res.data.id).then((response) => {
            //console.log("Role: " + response.data.tipoUsuario);
            //setRole(response.data.tipoUsuario);
            // localStorage.setItem("id", res.data.id);
            // localStorage.setItem("isLogged", res.data.isLogged);
            // localStorage.setItem("tipoUsuario", response.data.tipoUsuario);
            const id = localStorage.getItem("id");
            const role = localStorage.getItem("tipoUsuario");
            const isLogged = localStorage.getItem("isLogged");
            // setId(res.data.id);
            // setIsLogged(res.data.isLogged);
            // setRole(response.data.tipoUsuario);

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

  // const getSession = async () => {
  //   const id = await localStorage.getItem("id");
  //   const role = await localStorage.getItem("tipoUsuario");
  //   const isLogged = await localStorage.getItem("isLogged");
  //   if (!id && !role && !isLogged) {
  //     window.location.reload();
  //   }

  //   console.log("id localStorage app js: " + id);
  //   console.log("role localStorage app js: " + role);
  //   console.log("logged localStorage app js: " + isLogged);
  // };
  useEffect(() => {
    getSession();

    // const id = localStorage.getItem("id");
    // const role = localStorage.getItem("tipoUsuario");
    // const isLogged = localStorage.getItem("isLogged");
    console.log("hay session");
    console.log("logged?: " + isLogged);
    //console.log("id: " + id + " role: " + role + " isLogged: " + isLogged);
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
                    <Register />
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
                        <AdministradorActualizarDatosDeCuenta />
                      </main>
                      <Footer />
                    </>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
