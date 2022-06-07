import "../../scss/features/LoginStyle.scss";
import LightLogo from "../../img/logos/Ding-Dong-Logo-Light.svg";
import PlayStoreLogo from "../../img/logos/get-it-on-google-play-logo.svg";

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:8080/cuentas/login";

function validateMail(email) {
  let emailRegex =
    /^(([^<>():[\]\\.,;:\s@"]+(\.[^<>():[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const store = async (e) => {
    e.preventDefault();
    if (validateMail(email) === true) {
      const res = await axios.post(URI, {
        email: email,
        password: password,
      });
      console.log(
        `El usuario es: ${res.data.user}, y la password es: ${res.data.password}`
      );
      if (email === res.data.user && password === res.data.password) {
        console.log("Login correcto");
        navigate("/usuario/administrador");
      }
    }
    document.getElementById("invalidEmail").innerHTML =
      "Email invalido, por favor escriba un email valido";
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
                <div id="invalidEmail"></div>
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
