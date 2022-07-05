import React from "react";
import axios from "axios";
import logoDark from "../../../../img/logos/Ding-Dong-Logo-transparent-Nav.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//end points
const URI = "http://localhost:8080/cuentas/logout/status";
//------------------------------------------------------
function NavbarReceptor() {
  //states
  const [isToggled, setIsToggled] = useState(true);
  const navigate = useNavigate();
  //settings and data to close session
  const sessionId = localStorage.getItem("id");
  const logoutId = {
    usuarioId: sessionId,
  };
  axios.defaults.withCredentials = true;
  //close session
  const handleLogout = async (e) => {
    e.preventDefault();
    await axios
      .put(URI, logoutId, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        localStorage.clear();
      });
    navigate("/");
  };
  //close navbar
  const handleClick = (e) => {
    setIsToggled(!isToggled);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid " id="nav-wrapper">
        <Link to="/cuenta/receptor/home" className="navbar-brand">
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
                to="/cuenta/receptor/home"
                onClick={handleClick}
              >
                <i className="fa-solid me-2 fa-house-chimney"></i>
                Home Receptor
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav-item-base-status"
                aria-current="page"
                to="/cuenta/receptor/list-packages"
                onClick={handleClick}
              >
                <i className="fa-solid fa-users me-2" />
                Administrar Paquetes
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-item-base-status"
                aria-current="page"
                onClick={handleClick}
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
                  <a className="dropdown-item  drop-down-menu-element" href="#">
                    <i className="fa-solid fa-user me-2"></i> Mi Cuenta
                  </a>
                </li>
                <li>
                  <a className="dropdown-item drop-down-menu-element" href="#">
                    <i className="fa-solid fa-moon me-2 " />
                    Dark mode
                  </a>
                </li>
                <li>
                  <a className="dropdown-item drop-down-menu-element" href="#">
                    <i className="fa-solid fa-universal-access me-2" />
                    Accesibilidad
                  </a>
                </li>
                <li>
                  <a className="dropdown-item drop-down-menu-element" href="#">
                    <i className="fa-solid fa-circle-info me-2" />
                    Ayuda
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

export default NavbarReceptor;
