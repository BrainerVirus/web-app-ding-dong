import React from "react";
import logoDark from "../../img/logos/Ding-Dong-Logo-transparent-Nav.svg";
import logoLight from "../../img/logos/Ding-Dong-Logo-Nav-Light2.svg";
import NavbarStyle from "../../scss/features/NavbarStyle.scss";
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
              <a className="nav-link" aria-current="page" href="#">
                <i className="fa-solid me-2 fa-house-chimney"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa-solid fa-user me-2"></i> Mi Cuenta
              </a>
            </li>
            <li className="nav-item">
              <a class="nav-link" href="#">
                <i className="fa-solid fa-gears me-2"></i>Ajustes
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
