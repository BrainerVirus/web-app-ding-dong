import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../scss/features/LoginStyle.scss";
import LightLogo from "../../img/logos/Ding-Dong-Logo-Light.svg";
import PlayStoreLogo from "../../img/logos/get-it-on-google-play-logo.svg";
import AppStoreLogo from "../../img/logos/Download_on_the_App_Store_Badge.svg";
//import AuthContext from "../context/AuthContext";
// import { useUser, useUserUpdate } from "../context/AuthContext";
//import { useUser } from "../context/AuthContext";
import Cookies from "js-cookie";
const URI = "http://localhost:8080/cuentas/login";
const URITipoUsuario = "http://localhost:8080/tipoUsuario";
const regexValidEmail =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|cl|com|org|net|es)\b/;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [role, setRole] = useState("receptor");
  const [upperCaseRole, setUpperCaseRole] = useState("Receptores");
  const [mssgBienvenida, setmssgBienvenida] = useState();
  // const [usuario, setUsuario] = useState(useUser);
  const [isInvaliadEmailPass, setIsInvaliadEmailPass] = useState(false);
  //const { user } = useUser();
  // const userUpdater = useUserUpdate();
  //const [user, setUser] = useState("");
  //console.log(user);
  const navigate = useNavigate();
  // console.log(
  //   "User:" + userProvider.user + userProvider.isLogged + userProvider.role
  // );
  //setear el valor del email al escribir
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  //setear el valor de la contraseña al escribir
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  //validacion de email
  function validateMail(email) {
    if (regexValidEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  const handleRoleToggle = (e) => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    if (isToggled) {
      setUpperCaseRole("Repartidores");
      setRole("repartidor");
    } else {
      setUpperCaseRole("Receptores");
      setRole("receptor");
    }
  }, [isToggled]);
  const handleSession = () => {
    Cookies.get("token");
  };
  useEffect(() => {
    handleSession();
    console.log("this are the cookies in login: " + Cookies.get("token"));
  }, []);
  // useEffect(() => {
  //   validateMail(email);
  // }, [email]);
  axios.defaults.withCredentials = true;
  // Consulta a la api para el login
  const store = async (e) => {
    e.preventDefault();
    if (validateMail(email) === true) {
      await axios
        .post(URI, {
          email: email,
          password: password,
        })
        .then((result) => {
          const userAth = {
            id: result.data.id,
            user: result.data.user,
            usuarioId: result.data.usuarioId,
          };
          console.log(
            `El id de la cuenta es: ${userAth.id}, el usuario es: ${userAth.user}, y el id del usuario es: ${userAth.usuarioId}`
          );
          axios
            .get(URITipoUsuario + "/usuario/" + userAth.usuarioId)
            .then((res) => {
              console.log(
                "Entra al tipo de usuario, y el id del usu es: " +
                  userAth.usuarioId
              );
              userAth.tipoUsuario = res.data.tipoUsuario;
              console.log("tipo de usuario: " + userAth.tipoUsuario);
              console.log("role: " + role);
              // if (role === userAth.tipoUsuario) {
              //   console.log("rol correcto");
              // }
              if (email === userAth.user && role === userAth.tipoUsuario) {
                // console.log("Login correcto");
                console.log("rol correcto");
                setIsInvaliadEmailPass(false);
                Swal.fire({
                  text: "Inicio de sesion exitoso",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
                console.log(role);
                //navigate(`/?id=${userAth.id}`);
                setTimeout(() => {
                  navigate(`/?id=${userAth.id}`);
                }, 2000);
              } else {
                setIsInvaliadEmailPass(true);
              }
            });
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    } else {
      setIsInvaliadEmailPass(true);
    }
    // document.getElementById("invalidEmail").innerHTML =
    //   "Email invalido, por favor escriba un email valido";
    //navigate("/");
  };
  return (
    <div className="container-fluid vh-100" id="container-login">
      <div className="row vh-100" id="column-container">
        <div className="col-md-6 col-sm-12 d-flex flex-column" id="col-left">
          <div className="img-wrapper text-center">
            <figure>
              <img id="bg-logo" className="img-fluid" />
            </figure>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 d-flex flex-column" id="right-col">
          <div
            className="header-wrapper mb-3 pt-5 text-center"
            id="header-login"
          >
            <h1>
              <i>¡Bienvenidos!</i>
            </h1>
            <h2>
              Usuarios <i className="fa-solid fa-dolly" id="title-logo"></i>{" "}
              {upperCaseRole}
            </h2>
          </div>
          <div id="form-wrapper">
            <form onSubmit={store}>
              <div className="mb-3 d-flex flex-column">
                <label className="toggle col-sm-6 offset-sm-3">
                  <input type="checkbox" onClick={handleRoleToggle} />
                  <span className="slider"></span>
                  <span
                    className="labels"
                    data-on="Receptor"
                    data-off="Repartidor"
                  ></span>
                </label>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-1 offset-sm-3 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-6 offset-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="d-flex flex-column">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-1 offset-sm-3 col-form-label"
                >
                  Password
                </label>
                <div className="col-sm-6 offset-sm-3">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    onChange={handlePassChange}
                    value={password}
                  />
                </div>
                <div
                  className={
                    isInvaliadEmailPass
                      ? "invalidEmail-show"
                      : "invalidEmail-hidden"
                  }
                >
                  <p>Email y/o contraseña(s) invalido(s)</p>
                </div>
              </div>
              <div className="mb-3 form-check">
                <div className="d-flex flex-row">
                  <div className="offset-sm-3 ps-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                  </div>
                  <label className="form-check-label" htmlFor="rememberMe">
                    Recordarme
                  </label>
                </div>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                id="btn-wrapper"
              >
                <button
                  id="submit-btn"
                  type="submit"
                  className="btn btn-primary pt-2 px-5 mb-1"
                  style={{ backgroundColor: "#C48E3C" }}
                >
                  Iniciar sesión
                </button>
                <a href="#" id="forgot-pass-link">
                  <p>¿Olvidaste tú contraseña?</p>
                </a>
                <hr id="forgot-pass-hr"></hr>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
