import React from "react";
import axios from "axios";
import logoDark from "../../img/logos/Ding-Dong-Logo-transparent-Nav.svg";
import logoLight from "../../img/logos/Ding-Dong-Logo-Nav-Light2.svg";
import NavbarStyle from "../../scss/features/Administrador/NavbarAdministrador.scss";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const URI = "http://localhost:8080/cuentas/logout/status";
function NavbarAdministrador() {
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
        <a className="navbar-brand" href="#">
          <img src={logoDark} width="100px" height="50px" />
        </a>
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
              <a
                className="nav-link nav-item-base-status"
                aria-current="page"
                href="/cuenta/administrador/home"
              >
                <i className="fa-solid me-2 fa-house-chimney"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link nav-item-base-status"
                href="/cuenta/administrador/list-repartidores"
              >
                <i className="fa-solid fa-user me-2"></i> Mantenedor
                Repartidores
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

export default NavbarAdministrador;
