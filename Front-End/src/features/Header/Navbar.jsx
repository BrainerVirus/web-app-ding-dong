import React from "react";
import axios from "axios";
import logoDark from "../../img/logos/Ding-Dong-Logo-transparent-Nav.svg";
import logoLight from "../../img/logos/Ding-Dong-Logo-Nav-Light2.svg";
import NavbarStyle from "../../scss/features/NavbarStyle.scss";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const URI = "http://localhost:8080/cuentas/logout/status";
function Navbar() {
  const navigate = useNavigate();
  //const session = useContext(AuthContext);
  //console.log("role del local: " + role);
  // const [activeRole, setActiveRole] = useState(() => {
  //   const savedItem = localStorage.getItem("tipoUsuario");
  // });
  // console.log("activeRole: " + activeRole);
  const sessionId = localStorage.getItem("id");
  //console.log("id navbar: " + session.role);
  const logoutId = {
    usuarioId: sessionId,
  };
  // useEffect(() => {
  //   const role = localStorage.getItem("tipoUsuario");
  //   //setActiveRole(role);
  //   console.log("effect montado: " + role);
  // }, []);
  axios.defaults.withCredentials = true;
  const handleLogout = async (e) => {
    e.preventDefault();
    await axios
      .put(URI, logoutId, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        //console.log("session logout");
        localStorage.clear();
        //setActiveRole("");
      });
    //console.log("localStorage: " + session);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid " id="nav-wrapper">
        <Link to="/" className="navbar-brand">
          <img src={logoDark} width="100px" height="50px" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link nav-item-base-status"
                aria-current="page"
                to="/"
              >
                <i className="fa-solid me-2 fa-house-chimney"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-item-base-status"
                aria-current="page"
                href="#receptor-navbar-link"
              >
                <i className="fa-solid me-2 fa-boxes-packing"></i>
                Receptor
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-item-base-status"
                aria-current="page"
                href="#repartidor-navbar-link"
              >
                <i className="fa-solid me-2 fa-truck-fast"></i>
                Repartidor
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-item-base-status"
                aria-current="page"
                href="#more-info-navbar-link"
              >
                <i className="fa-solid fa-circle-info me-2"></i>
                Más información
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-item-base-status"
                aria-current="page"
                href="#contact-navbar-link"
              >
                <i className="fa-solid fa-message me-2"></i>
                Contáctanos
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
                <i className="fa-solid fa-users me-2"></i>Iniciar sesión
              </a>
              <ul className="dropdown-menu dropdown-menu-end drop-down-border-radious-none">
                <li>
                  <Link
                    className="dropdown-item drop-down-menu-element"
                    to="/empresas/login"
                  >
                    <i className="fa-solid fa-user-tie me-2"></i>
                    Empresas
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item drop-down-menu-element"
                    to="/personas/login"
                  >
                    <i className="fa-solid fa-user me-2"></i>
                    Personas
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle nav-item-base-status"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <i class="fa-solid fa-user-plus me-2"></i>Registrarse
              </a>
              <ul className="dropdown-menu dropdown-menu-end drop-down-border-radious-none">
                <li>
                  <Link
                    className="dropdown-item drop-down-menu-element"
                    to="/empresas/login"
                  >
                    <i className="fa-solid fa-user-tie me-2"></i>
                    Empresas
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item drop-down-menu-element"
                    to="/personas/receptor/register"
                  >
                    <i className="fa-solid fa-user me-2"></i>
                    Receptor
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
