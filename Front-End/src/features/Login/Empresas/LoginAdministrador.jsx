import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginAdminStyle.module.scss";
// import LightLogo from "../../img/logos/Ding-Dong-Logo-Light.svg";
// import PlayStoreLogo from "../../img/logos/get-it-on-google-play-logo.svg";
// import AppStoreLogo from "../../img/logos/Download_on_the_App_Store_Badge.svg";

const URI = "http://localhost:8080/cuentas/login";
const URITipoUsuario = "http://localhost:8080/tipoUsuario";
const regexValidEmail =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|cl|com|org|net|es)\b/;

function LoginAdmin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("administrador");
  const [isInvaliadEmailPass, setIsInvaliadEmailPass] = useState(false);
  const navigate = useNavigate();
  //axios
  axios.defaults.withCredentials = false;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
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
  axios.defaults.withCredentials = false;
  // Consulta a la api para el login
  const store = async (e) => {
    e.preventDefault();
    if (validateMail(email) === true) {
      await axios
        .post(URI, {
          email: email,
          password: password,
        })
        .catch(() => {
          setIsInvaliadEmailPass(true);
        })
        .then((result) => {
          if (result.data.id) {
            const userAth = {
              id: result.data.id,
              user: result.data.user,
              usuarioId: result.data.usuarioId,
              isLogged: result.data.isLogged,
              token: result.data.token,
            };
            console.log(
              "salimos del login de foma correcta sin cookies" +
                result.data.token
            );
            axios
              .get(URITipoUsuario + "/usuario/" + userAth.usuarioId)
              .then((res) => {
                userAth.tipoUsuario = res.data.tipoUsuario;
                if (email === userAth.user && role === userAth.tipoUsuario) {
                  setIsInvaliadEmailPass(false);
                  localStorage.setItem("id", result.data.usuarioId);
                  localStorage.setItem("isLogged", result.data.isLogged);
                  localStorage.setItem("tipoUsuario", res.data.tipoUsuario);
                  localStorage.setItem("token", result.data.token);
                  props.changeId(result.data.usuarioId);
                  props.changeLogged(result.data.isLogged);
                  props.changeRole(res.data.tipoUsuario);
                  props.changeToken(result.data.token);
                  Swal.fire({
                    text: "Inicio de sesion exitoso",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  setTimeout(() => {
                    navigate(`/cuenta/administrador/home`);
                  }, 2000);
                } else {
                  setIsInvaliadEmailPass(true);
                }
              });
          } else {
            setIsInvaliadEmailPass(true);
          }
        })
        .catch((error) => {});
    } else {
      setIsInvaliadEmailPass(true);
    }
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
              <i>¡Bienvenidas!</i>
            </h1>
            <h2>
              Empresas <i className="fa-solid fa-dolly" id="title-logo"></i>{" "}
              Repartidoras
            </h2>
          </div>
          <div id="form-wrapper">
            <form onSubmit={store}>
              <div className="mb-3 d-flex flex-column">
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
export default LoginAdmin;
