import React from "react";
import Navbar from "../../Header/Navbar";
function AdministradorHome() {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <div className="col-md-4">seccion 1</div>
        <div className="col-md-4">seccion 2</div>
        <div className="col-md-4">seccion 3</div>
      </div>
    </div>
  );
}

export default AdministradorHome;
