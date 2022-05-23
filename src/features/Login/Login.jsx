import "../../scss/features/LoginStyle.scss";
import React from "react";
import { useState, useEffect } from "react";
import LightLogo from "../../img/logos/Ding-Dong-Logo-Light.svg";
import LoginBg from "../../img/logos/login-bg.svg";

function validateMail(email) {
  let emailRegex =
    /^(([^<>():[\]\\.,;:\s@"]+(\.[^<>():[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(password) {
  let passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/;
  if (passwordRegex.test(password)) {
    return true;
  } else {
    return false;
  }
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleBlurEmail() {
    let validEmail = document.getElementById("email").value;

    if (validateMail(validEmail) === true) {
      document.getElementById("email").className =
        "form-control border-success";
      setEmail(validEmail);
    } else {
      document.getElementById("email").className = "form-control border-danger";
      setEmail("");
    }
  }

  function handleBlurPass() {
    let validPassword = document.getElementById("inputPassword").value;

    if (validatePassword(validPassword)) {
      document.getElementById("inputPassword").className =
        "form-control border-success";
      setPassword(validPassword);
    } else {
      document.getElementById("inputPassword").className =
        "form-control border-danger";
      setPassword("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("entra al submit");
    if (email === "") {
      document.getElementById("email").className = "form-control border-danger";
    }
    if (password === "") {
      document.getElementById("inputPassword").className =
        "form-control border-danger";
    }
    if (email !== "" && password !== "") {
      console.log("entra al if");
      document.getElementById("form-login").submit();
    }
  }
  return (
    <div className="container-fluid vh-100" id="container-login">
      <div className="row vh-100">
        <div className="col-md-6" id="col-left">
          <div className="img-wrapper text-center">
            <figure>
              <img id="bg-logo" className="img-fluid" alt="logo-light" />
            </figure>
          </div>
        </div>
        <div className="col-md-6" id="right-col">
          <div className="header-wrapper mb-3 text-center" id="header-login">
            <h1>
              <i>¡Bienvenidas!</i>
            </h1>
            <h2>
              Empresas <i className="fa-solid fa-dolly" id="title-logo"></i>{" "}
              Repartidoras
            </h2>
          </div>
          <div id="form-wrapper">
            <form onSubmit={handleSubmit}>
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
                    placeholder="email@example.com"
                    onBlur={handleBlurEmail}
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
                    onBlur={handleBlurPass}
                  />
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
              <button
                id="submit-btn"
                type="submit"
                className="btn btn-primary col-sm-4 offset-sm-4"
                style={{ backgroundColor: "#C48E3C" }}
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
