import React from "react";
import axios from "axios";
import "../../scss/features/LoginStyle.scss";
import LightLogo from "../../img/logos/Ding-Dong-Logo-Light.svg";
import PlayStoreLogo from "../../img/logos/get-it-on-google-play-logo.svg";
import AppStoreLogo from "../../img/logos/Download_on_the_App_Store_Badge.svg";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import defultProfileImg from "../../img/profile/default-profile-img.jpeg";
const qs = require("qs");

const URICuentas = "http://localhost:8080/cuentas/register";
const URIUsuarios = "http://localhost:8080/usuario/";
const URIDirecciones = "http://localhost:8080/direccion/";
const URITipoUsuario = "http://localhost:8080/tipoUsuario/";

const regexValidEmail =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|cl|com|org|net|es)\b/;
const regexValidPassLowerCase = /(?=.*[a-z])/;
const regexValidPassUpperCase = /(?=.*[A-Z])/;
const regexValidPassNumber = /(?=.*[0-9])/;
const regexValidPassSymbol = /(?=.*[!@#$%^&*])/;
const regexValidPass8length = /(?=.{8,})/;

function Register() {
  //----------------------------------------------------------
  //form states
  const [img, setImg] = useState("image/default-profile-img.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [run, setRun] = useState("N/A");
  const [nombre, setNombre] = useState("N/A");
  const [apellidoPaterno, setApellidoPaterno] = useState("N/A");
  const [apellidoMaterno, setApellidoMaterno] = useState("N/A");
  const [fechaNacimiento, setFechaNacimiento] = useState("0001-01-01");
  const [calle, setCalle] = useState("N/A");
  const [numCalle, setNumCalle] = useState("N/A");
  const [region, setRegion] = useState("N/A");
  const [comuna, setComuna] = useState("N/A");
  const [celular, setCelular] = useState("N/A");
  //----------------------------------------------------------
  //form validations
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordLowerCase, setvalidPasswordLowerCase] = useState(false);
  const [validPasswordUpperCase, setvalidPasswordUpperCase] = useState(false);
  const [validPasswordSybmbos, setvalidPasswordSybmbos] = useState(false);
  const [validPasswordNumbers, setvalidPasswordNumbers] = useState(false);
  const [validPassword8Char, setvalidPassword8Char] = useState(false);

  //----------------------------------------------------------
  //other states
  const [showMessege, setShowMessege] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);
  const tipoUsuario = "repartidor";
  //navitaion
  const navigate = useNavigate();
  //email set and validate
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const validateEmail = (email) => {
    regexValidEmail.test(email) ? setValidEmail(true) : setValidEmail(false);
  };
  useEffect(() => {
    validateEmail(email);
  }, [email]);
  //password set and validate
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };
  const validatePassword = (password, rePassword) => {
    regexValidPassLowerCase.test(password)
      ? setvalidPasswordLowerCase(true)
      : setvalidPasswordLowerCase(false);
    regexValidPassUpperCase.test(password)
      ? setvalidPasswordUpperCase(true)
      : setvalidPasswordUpperCase(false);
    regexValidPassSymbol.test(password)
      ? setvalidPasswordSybmbos(true)
      : setvalidPasswordSybmbos(false);
    regexValidPassNumber.test(password)
      ? setvalidPasswordNumbers(true)
      : setvalidPasswordNumbers(false);
    regexValidPass8length.test(password)
      ? setvalidPassword8Char(true)
      : setvalidPassword8Char(false);
    if (password === rePassword && password && rePassword) {
      console.log("passwords match");
      setValidPassword(true);
    } else setValidPassword(false);
  };
  useEffect(() => {
    validatePassword(password, rePassword);
  }, [password, rePassword]);
  //show password
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  //show re password
  const handleReShowPassword = (e) => {
    e.preventDefault();
    setReShowPassword(!showRePassword);
  };
  const store = async (e) => {
    e.preventDefault();
    console.log("valid mail: " + validEmail);
    console.log("valid pass: " + validPassword);
    if (validEmail && validPassword) {
      const usuarioData = {
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        run: run,
        celular: celular,
        fecha_nacimiento: fechaNacimiento,
      };

      const cuentaData = new FormData();
      cuentaData.append("profileImg", img);
      cuentaData.append("user", email);
      cuentaData.append("password", password);

      const direccionData = {
        calle: calle,
        numCalle: numCalle,
        comuna: comuna,
        region: region,
      };

      const tipoUsuarioData = {
        tipoUsuario: tipoUsuario,
      };
      await axios
        .post(URIUsuarios, qs.stringify(usuarioData))
        .then((result) => {
          console.log(result.data);
          console.log(result.data.usuarioId);
          cuentaData.append("usuarioId", result.data.usuarioId);
          direccionData.usuarioId = result.data.usuarioId;
          tipoUsuarioData.usuarioId = result.data.usuarioId;
          console.log("direcion user id: " + direccionData.usuarioId);
          axios.post(URICuentas, cuentaData);
          axios.post(URIDirecciones, direccionData);
          axios.post(URITipoUsuario, tipoUsuarioData);
          //messege success
          cleanStates(e);
          handleShowMessege();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Uno o más campos son inválidos");
    }
  };
  // show message after submit
  const handleShowMessege = (e) => {
    setShowMessege(!showMessege);
  };
  // show message close by x button
  const handleCloseMessege = (e) => {
    setShowMessege(false);
  };
  //discard btn
  const cleanStates = (e) => {
    e.preventDefault();
    //datos usuario
    //setEmail("");
    //setPassword("");
    //setRePassword("");
    // setShowMessege(false);
    //show password
    setShowPassword(false);
    setReShowPassword(false);
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
                <div>
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className={
                      email === ""
                        ? "form-control"
                        : validEmail
                        ? "form-control valid-input-border"
                        : "form-control invalid-input-border"
                    }
                    id="email"
                    onChange={handleEmailChange}
                    value={email}
                    placeholder="email@examaple.com"
                    autoComplete="off"
                    required
                  />
                </div>
                <div
                  className={
                    validEmail || email === ""
                      ? "valid-message-hidden"
                      : "invalid-message"
                  }
                >
                  El email ingresado no es válido
                </div>
              </div>
              <div className="d-flex flex-column">
                <div>
                  <label htmlFor="password" className="form-label">
                    Nueva contraseña:
                  </label>
                  <div className="pass-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={
                        password === ""
                          ? "form-control"
                          : validPassword
                          ? "form-control valid-input-border"
                          : "form-control invalid-input-border"
                      }
                      id="password"
                      onChange={handlePasswordChange}
                      value={password}
                      required
                    />
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "black" }}
                      onClick={handleShowPassword}
                    />
                  </div>
                </div>
                <div class="requirements">
                  <ul>
                    <li
                      id="length"
                      className={
                        password === ""
                          ? "valid-message-default"
                          : validPassword8Char
                          ? "valid-message"
                          : "invalid-message"
                      }
                    >
                      Mínimo 8 caracteres
                    </li>
                    <li
                      id="uppercase"
                      className={
                        password === ""
                          ? "valid-message-default"
                          : validPasswordUpperCase
                          ? "valid-message"
                          : "invalid-message"
                      }
                    >
                      Mínimo una mayúscula (A-Z)
                    </li>
                    <li
                      id="lowercase"
                      className={
                        password === ""
                          ? "valid-message-default"
                          : validPasswordLowerCase
                          ? "valid-message"
                          : "invalid-message"
                      }
                    >
                      Mínimo una minúscula (a-z)
                    </li>
                    <li
                      id="numbers"
                      className={
                        password === ""
                          ? "valid-message-default"
                          : validPasswordNumbers
                          ? "valid-message"
                          : "invalid-message"
                      }
                    >
                      Mínimo un número (0-9)
                    </li>
                    <li
                      id="symbols"
                      className={
                        password === ""
                          ? "valid-message-default"
                          : validPasswordSybmbos
                          ? "valid-message"
                          : "invalid-message"
                      }
                    >
                      Mínimo un símbolo (!, #, $, etc.)
                    </li>
                  </ul>
                </div>
                <div>
                  <label htmlFor="rePassword" className="form-label">
                    Confirmar contraseña:
                  </label>
                  <div className="pass-container">
                    <input
                      type={showRePassword ? "text" : "password"}
                      className={
                        rePassword === ""
                          ? "form-control"
                          : validPassword
                          ? "form-control valid-input-border"
                          : "form-control invalid-input-border"
                      }
                      id="rePassword"
                      onChange={handleRePasswordChange}
                      value={rePassword}
                      autoComplete="off"
                      required
                    />
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "black" }}
                      onClick={handleReShowPassword}
                    />
                  </div>
                </div>
                <div
                  className={
                    validPassword || password === ""
                      ? "valid-message-hidden"
                      : "invalid-message"
                  }
                >
                  Las contraseñas no coninciden
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
                  Registrarse
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

export default Register;
