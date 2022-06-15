import React from "react";
import "../../../scss/features/Administrador/ActualizarDatosDeCuentaAdmin.scss";
import { useRef, useState, useEffect } from "react";
function Administrador() {
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();
  const handleFileInput = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImg(file);
    } else {
      setImg("");
    }
  };
  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setPreview("");
    }
  }, [img]);
  return (
    <div className="container-fluid container-actualizar-datos-admin">
      <h1 className="grid-span-3">Mi Cuenta</h1>
      <div
        className="col-md-4 flex-container right-side-border"
        id="datos-usuario-container"
      >
        <form>
          <h2 className="font-weight-bold">Foto de Pefil</h2>
          <div className="flex-container">
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="image/*"
            />
            {preview ? (
              <div className="img-preview-wrapper flex-container no-margin-bottom">
                <img src={preview} className="img-preview" />
                <button
                  className="btn btn-primary img-preview-btn mt-2"
                  onClick={handleFileInput}
                >
                  Actualizar
                </button>
              </div>
            ) : (
              <div className="flex-container no-margin-bottom">
                <button className="round-img-btn" onClick={handleFileInput}>
                  Subir Imagen
                </button>
              </div>
            )}
          </div>
          <h2 className="font-weight-bold">Datos de usurio</h2>
          <div>
            <label for="email" class="form-label">
              Email:
            </label>
            <input type="email" class="form-control" id="email" />
          </div>
          <div>
            <label for="new-password" class="form-label">
              Nueva contraseña:
            </label>
            <input type="password" class="form-control" id="new-password" />
          </div>
          <div>
            <label for="re-new-password" class="form-label">
              Confirmar contraseña:
            </label>
            <input type="password" class="form-control" id="re-new-password" />
          </div>
          <div className="flex-container">
            <button className="btn btn-primary mt-2 align-self-center">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-4 flex-container right-side-border">
        <h2 className="font-weight-bold">Datos de la empresa</h2>
        <div>
          <label for="rut-empresa" class="form-label">
            RUT:
          </label>
          <input type="text" class="form-control" id="rut-empresa" disabled />
        </div>
        <div>
          <label for="nombre-empresa" class="form-label">
            Nombre:
          </label>
          <input
            type="text"
            class="form-control"
            id="nombre-empresa"
            disabled
          />
        </div>
      </div>
      <div className="col-md-4 flex-container space-between">
        <h2 className="font-weight-bold">Datos de contacto</h2>
        <form>
          <div>
            <label for="numero-celular" class="form-label">
              N° Celular:
            </label>
            <input type="tel" class="form-control" id="numero-celular" />
          </div>
          <div className="flex-container">
            <button className="btn btn-primary mt-2 align-self-center">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
      <div
        className="col-md-4 flex-container grid-span-2"
        id="datos-contacto-container"
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title font-weight-bold">Importante</h5>
            <p className="card-text">
              Tus datos de contacto son importantes para que, en caso de
              problemas y te comuniques con "Ding-Dong", por medio de estos como
              "Ding-Dong" podremos contactarte por distintos canales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Administrador;
