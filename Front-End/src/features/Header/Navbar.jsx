import React from "react";
import logoDark from "../../img/logos/Ding-Dong-Logo-transparent-Nav.svg";
import logoLight from "../../img/logos/Ding-Dong-Logo-Nav-Light2.svg";
import NavbarStyle from "../../scss/features/NavbarStyle.scss";
import { Link } from "react-router-dom";

function Navbar() {
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
                href="#"
              >
                <i className="fa-solid me-2 fa-house-chimney"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-item-base-status" href="#">
                <i className="fa-solid fa-user me-2"></i> Mi Cuenta
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle nav-item-base-status"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <i className="fa-solid fa-gears me-2"></i>Ajustes
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fa-solid fa-moon me-2" />
                    Dark mode
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fa-solid fa-universal-access me-2" />
                    Accesibilidad
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="fa-solid fa-circle-info me-2" />
                    Ayuda
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
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

export default Navbar;
