import React from "react";
import axios from "axios";
import "../../../scss/features/Administrador/ActualizarRepartidorAdminStyle.scss";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const qs = require("qs");

const URICuentas = "http://localhost:8080/cuentas/";
const URIUsuarios = "http://localhost:8080/usuario/";
const URIDirecciones = "http://localhost:8080/direccion/";
const URITipoUsuario = "http://localhost:8080/tipoUsuario/";

const RegionesYcomunas = [
  {
    NombreRegion: "Arica y Parinacota",
    comunas: ["Arica", "Camarones", "Putre", "General Lagos"],
  },
  {
    NombreRegion: "Tarapacá",
    comunas: [
      "Iquique",
      "Alto Hospicio",
      "Pozo Almonte",
      "Camiña",
      "Colchane",
      "Huara",
      "Pica",
    ],
  },
  {
    NombreRegion: "Antofagasta",
    comunas: [
      "Antofagasta",
      "Mejillones",
      "Sierra Gorda",
      "Taltal",
      "Calama",
      "Ollagüe",
      "San Pedro de Atacama",
      "Tocopilla",
      "María Elena",
    ],
  },
  {
    NombreRegion: "Atacama",
    comunas: [
      "Copiapó",
      "Caldera",
      "Tierra Amarilla",
      "Chañaral",
      "Diego de Almagro",
      "Vallenar",
      "Alto del Carmen",
      "Freirina",
      "Huasco",
    ],
  },
  {
    NombreRegion: "Coquimbo",
    comunas: [
      "La Serena",
      "Coquimbo",
      "Andacollo",
      "La Higuera",
      "Paiguano",
      "Vicuña",
      "Illapel",
      "Canela",
      "Los Vilos",
      "Salamanca",
      "Ovalle",
      "Combarbalá",
      "Monte Patria",
      "Punitaqui",
      "Río Hurtado",
    ],
  },
  {
    NombreRegion: "Valparaíso",
    comunas: [
      "Valparaíso",
      "Casablanca",
      "Concón",
      "Juan Fernández",
      "Puchuncaví",
      "Quintero",
      "Viña del Mar",
      "Isla de Pascua",
      "Los Andes",
      "Calle Larga",
      "Rinconada",
      "San Esteban",
      "La Ligua",
      "Cabildo",
      "Papudo",
      "Petorca",
      "Zapallar",
      "Quillota",
      "Calera",
      "Hijuelas",
      "La Cruz",
      "Nogales",
      "San Antonio",
      "Algarrobo",
      "Cartagena",
      "El Quisco",
      "El Tabo",
      "Santo Domingo",
      "San Felipe",
      "Catemu",
      "Llaillay",
      "Panquehue",
      "Putaendo",
      "Santa María",
      "Quilpué",
      "Limache",
      "Olmué",
      "Villa Alemana",
    ],
  },
  {
    NombreRegion: "Región del Libertador Gral. Bernardo O’Higgins",
    comunas: [
      "Rancagua",
      "Codegua",
      "Coinco",
      "Coltauco",
      "Doñihue",
      "Graneros",
      "Las Cabras",
      "Machalí",
      "Malloa",
      "Mostazal",
      "Olivar",
      "Peumo",
      "Pichidegua",
      "Quinta de Tilcoco",
      "Rengo",
      "Requínoa",
      "San Vicente",
      "Pichilemu",
      "La Estrella",
      "Litueche",
      "Marchihue",
      "Navidad",
      "Paredones",
      "San Fernando",
      "Chépica",
      "Chimbarongo",
      "Lolol",
      "Nancagua",
      "Palmilla",
      "Peralillo",
      "Placilla",
      "Pumanque",
      "Santa Cruz",
    ],
  },
  {
    NombreRegion: "Región del Maule",
    comunas: [
      "Talca",
      "ConsVtución",
      "Curepto",
      "Empedrado",
      "Maule",
      "Pelarco",
      "Pencahue",
      "Río Claro",
      "San Clemente",
      "San Rafael",
      "Cauquenes",
      "Chanco",
      "Pelluhue",
      "Curicó",
      "Hualañé",
      "Licantén",
      "Molina",
      "Rauco",
      "Romeral",
      "Sagrada Familia",
      "Teno",
      "Vichuquén",
      "Linares",
      "Colbún",
      "Longaví",
      "Parral",
      "ReVro",
      "San Javier",
      "Villa Alegre",
      "Yerbas Buenas",
    ],
  },
  {
    NombreRegion: "Región del Biobío",
    comunas: [
      "Concepción",
      "Coronel",
      "Chiguayante",
      "Florida",
      "Hualqui",
      "Lota",
      "Penco",
      "San Pedro de la Paz",
      "Santa Juana",
      "Talcahuano",
      "Tomé",
      "Hualpén",
      "Lebu",
      "Arauco",
      "Cañete",
      "Contulmo",
      "Curanilahue",
      "Los Álamos",
      "Tirúa",
      "Los Ángeles",
      "Antuco",
      "Cabrero",
      "Laja",
      "Mulchén",
      "Nacimiento",
      "Negrete",
      "Quilaco",
      "Quilleco",
      "San Rosendo",
      "Santa Bárbara",
      "Tucapel",
      "Yumbel",
      "Alto Biobío",
      "Chillán",
      "Bulnes",
      "Cobquecura",
      "Coelemu",
      "Coihueco",
      "Chillán Viejo",
      "El Carmen",
      "Ninhue",
      "Ñiquén",
      "Pemuco",
      "Pinto",
      "Portezuelo",
      "Quillón",
      "Quirihue",
      "Ránquil",
      "San Carlos",
      "San Fabián",
      "San Ignacio",
      "San Nicolás",
      "Treguaco",
      "Yungay",
    ],
  },
  {
    NombreRegion: "Región de la Araucanía",
    comunas: [
      "Temuco",
      "Carahue",
      "Cunco",
      "Curarrehue",
      "Freire",
      "Galvarino",
      "Gorbea",
      "Lautaro",
      "Loncoche",
      "Melipeuco",
      "Nueva Imperial",
      "Padre las Casas",
      "Perquenco",
      "Pitrufquén",
      "Pucón",
      "Saavedra",
      "Teodoro Schmidt",
      "Toltén",
      "Vilcún",
      "Villarrica",
      "Cholchol",
      "Angol",
      "Collipulli",
      "Curacautín",
      "Ercilla",
      "Lonquimay",
      "Los Sauces",
      "Lumaco",
      "Purén",
      "Renaico",
      "Traiguén",
      "Victoria",
    ],
  },
  {
    NombreRegion: "Región de Los Ríos",
    comunas: [
      "Valdivia",
      "Corral",
      "Lanco",
      "Los Lagos",
      "Máfil",
      "Mariquina",
      "Paillaco",
      "Panguipulli",
      "La Unión",
      "Futrono",
      "Lago Ranco",
      "Río Bueno",
    ],
  },
  {
    NombreRegion: "Región de Los Lagos",
    comunas: [
      "Puerto Montt",
      "Calbuco",
      "Cochamó",
      "Fresia",
      "FruVllar",
      "Los Muermos",
      "Llanquihue",
      "Maullín",
      "Puerto Varas",
      "Castro",
      "Ancud",
      "Chonchi",
      "Curaco de Vélez",
      "Dalcahue",
      "Puqueldón",
      "Queilén",
      "Quellón",
      "Quemchi",
      "Quinchao",
      "Osorno",
      "Puerto Octay",
      "Purranque",
      "Puyehue",
      "Río Negro",
      "San Juan de la Costa",
      "San Pablo",
      "Chaitén",
      "Futaleufú",
      "Hualaihué",
      "Palena",
    ],
  },
  {
    NombreRegion: "Región Aisén del Gral. Carlos Ibáñez del Campo",
    comunas: [
      "Coihaique",
      "Lago Verde",
      "Aisén",
      "Cisnes",
      "Guaitecas",
      "Cochrane",
      "O’Higgins",
      "Tortel",
      "Chile Chico",
      "Río Ibáñez",
    ],
  },
  {
    NombreRegion: "Región de Magallanes y de la AntárVca Chilena",
    comunas: [
      "Punta Arenas",
      "Laguna Blanca",
      "Río Verde",
      "San Gregorio",
      "Cabo de Hornos (Ex Navarino)",
      "AntárVca",
      "Porvenir",
      "Primavera",
      "Timaukel",
      "Natales",
      "Torres del Paine",
    ],
  },
  {
    NombreRegion: "Región Metropolitana de Santiago",
    comunas: [
      "Cerrillos",
      "Cerro Navia",
      "Conchalí",
      "El Bosque",
      "Estación Central",
      "Huechuraba",
      "Independencia",
      "La Cisterna",
      "La Florida",
      "La Granja",
      "La Pintana",
      "La Reina",
      "Las Condes",
      "Lo Barnechea",
      "Lo Espejo",
      "Lo Prado",
      "Macul",
      "Maipú",
      "Ñuñoa",
      "Pedro Aguirre Cerda",
      "Peñalolén",
      "Providencia",
      "Pudahuel",
      "Quilicura",
      "Quinta Normal",
      "Recoleta",
      "Renca",
      "San Joaquín",
      "San Miguel",
      "San Ramón",
      "Vitacura",
      "Puente Alto",
      "Pirque",
      "San José de Maipo",
      "Colina",
      "Lampa",
      "TilVl",
      "San Bernardo",
      "Buin",
      "Calera de Tango",
      "Paine",
      "Melipilla",
      "Alhué",
      "Curacaví",
      "María Pinto",
      "San Pedro",
      "Talagante",
      "El Monte",
      "Isla de Maipo",
      "Padre Hurtado",
      "Peñaflor",
    ],
  },
];

function AdministradorActualizarCuentaRepartidor() {
  //states
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [calle, setCalle] = useState("");
  const [numCalle, setNumCalle] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [celular, setCelular] = useState("");
  const tipoUsuario = "repartidor";
  const { id } = useParams();
  //navitaion
  const navigate = useNavigate();

  // profile photo upload
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
  // handle region change and comuna change
  const mapRegion = (RegionesYcomunas) => {
    return RegionesYcomunas.map((regionAEvaluar) => {
      return (
        <option
          key={regionAEvaluar.NombreRegion}
          value={regionAEvaluar.NombreRegion}
        >
          {regionAEvaluar.NombreRegion}
        </option>
      );
    });
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };
  const mapComuna = (RegionesYcomunas) => {
    return RegionesYcomunas.map((regionAEvaluar) => {
      if (regionAEvaluar.NombreRegion === region) {
        return regionAEvaluar.comunas.map((comunaAEvaluar) => {
          return (
            <option key={comunaAEvaluar} value={comunaAEvaluar}>
              {comunaAEvaluar}
            </option>
          );
        });
      }
      return null;
    });
  };
  // handle datos de usuario
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };
  //validador de pass
  const comparePasswords = (password, rePassword) => {
    console.log(rePassword);
    if (
      password === rePassword &&
      password !== "" &&
      rePassword !== "" &&
      password !== undefined &&
      rePassword !== undefined
    ) {
      console.log("passwords match");
      //passwordHtml.classList.add("border-success");
      //rePasswordHtml.classList.add("border-success");
      document.getElementById("password").className =
        "form-control border-success";
      document.getElementById("rePassword").className =
        "form-control border-success";
    } else {
      if (
        password === "" ||
        rePassword === "" ||
        password === undefined ||
        rePassword === undefined
      ) {
        document.getElementById("password").className = "form-control";
        document.getElementById("rePassword").className = "form-control";
      } else {
        document.getElementById("password").className =
          "form-control border-danger";
        document.getElementById("rePassword").className =
          "form-control border-danger";
      }
    }
  };
  useEffect(() => {
    comparePasswords(password, rePassword);
  }, [password, rePassword]);
  //datos personales
  const handleRunChange = (e) => {
    setRun(e.target.value);
  };
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  const handleApellidoPaternoChange = (e) => {
    setApellidoPaterno(e.target.value);
  };
  const handleApellidoMaternoChange = (e) => {
    setApellidoMaterno(e.target.value);
  };
  const handleFechaNacimientoChange = (e) => {
    setFechaNacimiento(e.target.value);
  };
  const handleCalleChange = (e) => {
    setCalle(e.target.value);
  };
  const handleNumCalleChange = (e) => {
    setNumCalle(e.target.value);
  };

  //datos de contacto
  const handleCelularChange = (e) => {
    setCelular(e.target.value);
  };
  // Formulario de envio de datos a la api
  /*const store = async (e) => {
    console.log(email);
    console.log(password);
    console.log(img);
    e.preventDefault();
    //form data way
    const formData = new FormData();
    console.log(nombre);
    console.log(apellidoMaterno);
    console.log(apellidoPaterno);
    console.log(run);
    console.log(celular);
    console.log(fechaNacimiento);
    console.log(img);
    console.log(email);
    console.log(password);

    formData.append("profileImg", img);
    formData.append("user", email);
    formData.append("password", password);
    //formData.append("nombre", nombre);
    //formData.append("apellidoPaterno", apellidoPaterno);
    //formData.append("apellidoMaterno", apellidoMaterno);
    //formData.append("run", run);
    //formData.append("celular", celular);
    //formData.append("fecha_nacimiento", fechaNacimiento);
    console.log(formData);
    await axios.post(URI, formData);*/
  //----------------------------------------------------------
  //const params = new URLSearchParams();
  //axios post to database json way
  const store = async (e) => {
    e.preventDefault();
    const usuarioData = {
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      run: run,
      celular: celular,
      fecha_nacimiento: fechaNacimiento,
    };

    const cuentaData = new FormData();
    cuentaData.append("profileImg", img);
    cuentaData.append("user", email);
    cuentaData.append("password", password);

    const direccionData = {
      calle: calle,
      numCalle: numCalle,
      comuna: comuna,
      region: region,
    };

    const tipoUsuarioData = {
      tipoUsuario: tipoUsuario,
    };
    /*const options = {
      method: "POST",
      headers: { "content-type": "application/form-data" },
      data: cuenta,
      url: URI,
    };
    axios(options);*/
    await axios
      .post(URIUsuarios, qs.stringify(usuarioData))
      .then((result) => {
        console.log(result.data);
        console.log(result.data.usuarioId);
        cuentaData.append("usuarioId", result.data.usuarioId);
        direccionData.usuarioId = result.data.usuarioId;
        tipoUsuarioData.usuarioId = result.data.usuarioId;
        console.log("direcion user id: " + direccionData.usuarioId);
        axios.post(URICuentas, cuentaData);
        axios.post(URIDirecciones, direccionData);
        axios.post(URITipoUsuario, tipoUsuarioData);
      })
      .catch((err) => {
        console.log(err);
      });
    //const resp = res.id;
    //history.push('/cuentas/')
    //navigate("/");
  };
  //----------------------------------------------------------
  //json way 2
  //store
  /*const store = async (e) => {
    e.preventDefault();
    await axios.post(
      URI,
      {
        //nombre: nombre,
        //apellidoPaterno: apellidoPaterno,
        //apellidoMaterno: apellidoMaterno,
        //run: run,
        //celular: celular,
        //fecha_nacimiento: fechaNacimiento,
        user: email,
        password: password,
        profileImg: img,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  };*/
  return (
    <form onSubmit={store}>
      <div className="container-fluid container-actualizar-datos-admin">
        <h1 className="grid-span-3">Crear cuenta de repartidor</h1>
        <div
          className="col-md-4 flex-container right-side-border"
          id="datos-usuario-container"
        >
          <h2 className="font-weight-bold">Foto de Pefil</h2>
          <div className="flex-container">
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="image/*"
              name="profileImg"
              id="profileImg"
            />
            {preview ? (
              <div className="img-preview-wrapper flex-container no-margin-bottom">
                <img src={preview} className="img-preview" alt="profile-img" />
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
          <h2 className="font-weight-bold">Datos de usuario</h2>
          <div>
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Nueva contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="rePassword" className="form-label">
              Confirmar contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="rePassword"
              onChange={handleRePasswordChange}
            />
          </div>
        </div>
        <div className="col-md-4 flex-container space-between">
          <h2 className="font-weight-bold">Datos Personales</h2>
          <div>
            <label htmlFor="rut-empresa" className="form-label">
              RUN:
            </label>
            <input
              type="text"
              className="form-control"
              id="rut-empresa"
              onChange={handleRunChange}
            />
          </div>
          <div>
            <label htmlFor="nombre-empresa" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre-empresa"
              onChange={handleNombreChange}
            />
          </div>
          <div>
            <label htmlFor="apellido-paterno" className="form-label">
              Apellido paterno:
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido-paterno"
              onChange={handleApellidoPaternoChange}
            />
          </div>
          <div>
            <label htmlFor="apellido-materno" className="form-label">
              Apellido materno:
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido-materno"
              onChange={handleApellidoMaternoChange}
            />
          </div>
          <div>
            <label htmlFor="fecha-nacimiento" className="form-label">
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              className="form-control"
              id="fecha-nacimiento"
              onChange={handleFechaNacimientoChange}
            />
          </div>
          <div>
            <label htmlFor="calle" className="form-label">
              Calle:
            </label>
            <input
              type="text"
              className="form-control"
              id="calle"
              onChange={handleCalleChange}
            />
          </div>
          <div>
            <label htmlFor="calle" className="form-label">
              N° calle:
            </label>
            <input
              type="number"
              className="form-control"
              id="calle"
              onChange={handleNumCalleChange}
            />
          </div>
          <div>
            <label htmlFor="regiones" className="form-label">
              Region:
            </label>
            <select
              className="form-select"
              id="regiones"
              onChange={handleRegionChange}
            >
              <option>Seleccione una región</option>
              {mapRegion(RegionesYcomunas)}
            </select>
          </div>
          <div>
            <label htmlFor="comunas" className="form-label">
              Comuna:
            </label>
            <br />
            <select className="form-select" id="comunas">
              <option>Seleccione una comuna</option>\
              {mapComuna(RegionesYcomunas)}
            </select>
          </div>
        </div>
        <div className="col-md-4 flex-container space-between">
          <h2 className="font-weight-bold">Datos de contacto</h2>
          <div>
            <label htmlFor="numero-celular" className="form-label">
              N° Celular:
            </label>
            <input
              type="tel"
              className="form-control"
              id="numero-celular"
              onChange={handleCelularChange}
            />
          </div>
        </div>
        <div className="flex-container flex-row gap-2 justify-content-around grid-span-2">
          <button type="submit" className="btn btn-primary mt-2">
            Guardar cambios
          </button>
          <button type="reset" className="btn btn-danger mt-2 ">
            Descartar cambios
          </button>
        </div>
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

export default AdministradorActualizarCuentaRepartidor;
