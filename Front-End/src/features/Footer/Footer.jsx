import FooterSyle from "../../scss/features/FooterStyle.scss";

import React from "react";

function Footer() {
  return (
    <footer className="container-fluid d-flex justify-content-between col-md-12 col-sm-12">
      <div id="footer-left-column">
        <ul className="d-flex flex-row justify-content-between">
          <a href="#">
            <li>¿Quíenes somos?</li>
          </a>
          <a href="#">
            <li>Nuestros Servicios</li>
          </a>
          <a href="#">
            <li>Ayuda</li>
          </a>
        </ul>
        {/*Usar en versiones para usuarios que no sean empreas
            <img id="play-store-logo" src={PlayStoreLogo}></img>
            */}
      </div>
      <div id="footer-right-column" className="container-fluid">
        <ul className="d-flex flex-row justify-content-between">
          <a href="#">
            <li>Términos y condiciones de uso</li>
          </a>
          <a href="#">
            <li>Política de privacidad</li>
          </a>
        </ul>
        {/*Usar en versiones para usuarios que no sean empreas
            <img id="play-store-logo" src={PlayStoreLogo}></img>
            */}
      </div>
    </footer>
  );
}

export default Footer;
