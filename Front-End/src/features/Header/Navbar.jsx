import React from "react";
import logoDark from "../../img/logos/Ding-Dong-Logo-transparent-Nav.svg";
import "./NavbarStyle.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  //states
  const [isToggled, setIsToggled] = useState(true);
  //close navbar
  const handleClick = (e) => {
    setIsToggled(!isToggled);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid " id="nav-wrapper">
        <Link to="/" className="navbar-brand">
          <img src={logoDark} width="100px" height="50px" />
        </Link>
        <button
          className="navbar-toggler"
          onClick={handleClick}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
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
                to="/"
                onClick={handleClick}
              >
                <i className="fa-solid me-2 fa-house-chimney"></i>
                Home
              </Link>
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
                    onClick={handleClick}
                  >
                    <i className="fa-solid fa-user-tie me-2"></i>
                    Empresas
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item drop-down-menu-element"
                    to="/personas/login"
                    onClick={handleClick}
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
                    onClick={handleClick}
                  >
                    <i className="fa-solid fa-user-tie me-2"></i>
                    Empresas
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item drop-down-menu-element"
                    to="/personas/receptor/register"
                    onClick={handleClick}
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
