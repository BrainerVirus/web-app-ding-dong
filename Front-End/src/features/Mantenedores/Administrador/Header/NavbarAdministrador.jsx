import React from "react";
import axios from "axios";
import logoDark from "../../../../img/logos/Ding-Dong-Logo-transparent-Nav.svg";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//end points
const URI = "http://localhost:8080/cuentas/logout/status";
//------------------------------------------------------
function NavbarAdministrador() {
  //states
  const [isToggled, setIsToggled] = useState(true);
  const navigate = useNavigate();
  //settings and data to close session
  const sessionId = localStorage.getItem("id");
  const logoutId = {
    usuarioId: sessionId,
  };
  //axios config
  axios.defaults.withCredentials = false;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  //close session
  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.put(URI, logoutId, config).then((res) => {
      localStorage.clear();
    });
    navigate("/");
  };
  //close navbar
  const handleClick = (e) => {
    setIsToggled(!isToggled);
  };
  //coomning soon mssg
  const showCommingSoonMssg = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Lo sentimos",
      text: "Esta función aún no está disponible",
    }).then((result) => {
      handleClick();
    });
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid " id="nav-wrapper">
        <Link to="/" className="navbar-brand">
          <img src={logoDark} width="100px" height="50px" />
        </Link>
        <button
          className="navbar-toggler collapsed"
          onClick={handleClick}
          type="button"
          data-bs-target="#navbarNav"
          data-bs-toggle="collapse"
          aria-controls="navbarNav"
          aria-expanded={isToggled ? true : false}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={isToggled ? "navbar-collapse collapse" : "navbar-collapse"}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link nav-item-base-status"
                aria-current="page"
                to="/cuenta/administrador/home"
                onClick={handleClick}
              >
                <i className="fa-solid me-2 fa-house-chimney"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav-item-base-status"
                aria-current="page"
                to="/cuenta/administrador/list-repartidores"
                onClick={handleClick}
              >
                <i className="fa-solid fa-users me-2" />
                Mantenedor repartidores
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/cuenta/administrador/update/${sessionId}`}
                onClick={handleClick}
                className="nav-link nav-item-base-status"
                href="#"
              >
                <i className="fa-solid fa-user me-2"></i> Mi Cuenta
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-item-base-status"
                aria-current="page"
                onClick={showCommingSoonMssg}
                href="#"
              >
                <i className="fa-solid fa-message me-2"></i>
                Ayuda
              </a>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle nav-item-base-status"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <i className="fa-solid fa-gears me-2"></i>Ajustes
              </a>
              <ul className="dropdown-menu dropdown-menu-end drop-down-border-radious-none">
                <li>
                  <a
                    onClick={showCommingSoonMssg}
                    className="dropdown-item drop-down-menu-element"
                    href="#"
                  >
                    <i className="fa-solid fa-moon me-2 " />
                    Dark mode
                  </a>
                </li>
                <li>
                  <a
                    onClick={showCommingSoonMssg}
                    className="dropdown-item drop-down-menu-element"
                    href="#"
                  >
                    <i className="fa-solid fa-universal-access me-2" />
                    Accesibilidad
                  </a>
                </li>
                <li onClick={handleLogout}>
                  <a className="dropdown-item drop-down-menu-element" href="#">
                    <i className="fa-solid fa-arrow-right-from-bracket me-2" />
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdministrador;
