import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import actualizarRepatidorStyle from "./ActualizarDatosDeCuentaAdminStyle.module.scss";
import booststrap from "../../../../scss/Global/bootstrap.min.module.css";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//import defultProfileImg from "../../../img/profile/default-profile-img.jpeg";
const qs = require("qs");

const URICuentas = "http://localhost:8080/cuentas/";
const URICuentasRegister = "http://localhost:8080/cuentas/register";
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

const regexValidEmail =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|cl|com|org|net|es)\b/;
const regexValidPassLowerCase = /(?=.*[a-z])/;
const regexValidPassUpperCase = /(?=.*[A-Z])/;
const regexValidPassNumber = /(?=.*[0-9])/;
const regexValidPassSymbol = /(?=.*[!@#$%^&*])/;
const regexValidPass8length = /(?=.{8,})/;
const regexValidCelular = /(?<!\d)\d{9}(?!\d)/;
const excludedRuns = [
  111111111, 222222222, 333333333, 444444444, 555555555, 666666666, 777777777,
  888888888, 999999999,
];
function ActualizarDatosAccesoAdmin() {
  //----------------------------------------------------------
  //form states
  const [img, setImg] = useState("");
  const [oldImg, setOldImg] = useState("");
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
  const [numCalle, setNumCalle] = useState(123);
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [celular, setCelular] = useState("");
  //----------------------------------------------------------
  //form validations
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordLowerCase, setvalidPasswordLowerCase] = useState(false);
  const [validPasswordUpperCase, setvalidPasswordUpperCase] = useState(false);
  const [validPasswordSybmbos, setvalidPasswordSybmbos] = useState(false);
  const [validPasswordNumbers, setvalidPasswordNumbers] = useState(false);
  const [validPassword8Char, setvalidPassword8Char] = useState(false);
  const [validRun, setValidRun] = useState(false);
  const [validNombre, setValidNombre] = useState(false);
  const [validApellidoPaterno, setValidApellidoPaterno] = useState(false);
  const [validApellidoMaterno, setValidApellidoMaterno] = useState(false);
  //const [validFechaNacimiento, setValidFechaNacimiento] = useState(false);
  const [validCalle, setValidCalle] = useState(false);
  const [validNumCalle, setValidNumCalle] = useState(false);
  const [validCelular, setValidCelular] = useState(false);

  //----------------------------------------------------------
  //other states
  const [showMessege, setShowMessege] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);
  const params = useParams();
  const tipoUsuario = "administrador";
  const [edit, setEdit] = useState(false);

  //----------------------------------------------------------
  //first states to update
  axios.defaults.withCredentials = false;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    getAccountData();
    getDireccionData();
    getUserData();
  }, []);
  const getAccountData = async () => {
    const response = await axios.get(
      URICuentas + "/usuario/" + params.id,
      config
    );
    const oldImg = response.data.profileImg;
    setOldImg(oldImg);
    console.log("oldImg: " + oldImg);
    console.log("email: " + response.data.user);
    console.log("imagen: " + response.data.profileImg);
    setEmail(response.data.user);
    setPreview(`http://localhost:8080/${oldImg}`);
    setPassword(response.data.password);
    setRePassword(response.data.password);
  };
  const getDireccionData = async () => {
    const response = await axios.get(
      URIDirecciones + "/usuario/" + params.id,
      config
    );
    console.log("comuna: " + comuna);
    const numCalleTemp = response.data.numCalle;
    console.log("num calle parseado: " + parseInt(numCalleTemp));
    setCalle(response.data.calle);
    //setNumCalle();
    setRegion(response.data.region);
    setComuna(response.data.comuna);
  };

  const getUserData = async () => {
    const response = await axios.get(URIUsuarios + params.id, config);
    console.log("nombre: " + response.data.nombre);
    console.log("apellidoPaterno: " + response.data.apellidoPaterno);
    setRun(response.data.run);
    setNombre(response.data.nombre);
    setApellidoPaterno(response.data.apellidoPaterno);
    setApellidoMaterno(response.data.apellidoMaterno);
    setFechaNacimiento(response.data.fecha_nacimiento);
    setCelular(response.data.celular);
    //setEmail(response.data.user);
    //setPreview(`http://localhost:8080/${response.data.profileImg}`);
  };
  //----------------------------------------------------------
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
  const handleComunaChange = (e) => {
    setComuna(e.target.value);
  };
  // handle datos de usuario
  //email set and validate
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const validateEmail = (email) => {
    regexValidEmail.test(email) ? setValidEmail(true) : setValidEmail(false);
  };
  useEffect(() => {
    validateEmail(email);
  }, [email]);
  //password set and validate
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };
  const validatePassword = (password, rePassword) => {
    regexValidPassLowerCase.test(password)
      ? setvalidPasswordLowerCase(true)
      : setvalidPasswordLowerCase(false);
    regexValidPassUpperCase.test(password)
      ? setvalidPasswordUpperCase(true)
      : setvalidPasswordUpperCase(false);
    regexValidPassSymbol.test(password)
      ? setvalidPasswordSybmbos(true)
      : setvalidPasswordSybmbos(false);
    regexValidPassNumber.test(password)
      ? setvalidPasswordNumbers(true)
      : setvalidPasswordNumbers(false);
    regexValidPass8length.test(password)
      ? setvalidPassword8Char(true)
      : setvalidPassword8Char(false);
    if (password === rePassword && password && rePassword) {
      console.log("passwords match");
      setValidPassword(true);
    } else setValidPassword(false);
  };
  useEffect(() => {
    validatePassword(password, rePassword);
  }, [password, rePassword]);
  //datos personales
  //run set and validate
  const handleRunChange = (e) => {
    setRun(e.target.value);
  };
  const validateRun = (run) => {
    run = run.replace(/[.-]/g, "");
    run = run.toUpperCase();
    var patt = /^\d{8}[0-9K]$/;
    var ok = patt.test(run);
    var cStr = run.slice(0, -1);
    var cDig = run.slice(-1);
    var nSum = 0;
    var nVal = 0;
    var cVal = "";
    console.log("run equals excluded: " + run);
    console.log("patt test: " + ok);
    let excludedRunTest = false;
    for (let i = 0; i < excludedRuns.length; i++) {
      if (run == excludedRuns[i]) {
        console.log("Entra al false del run: " + excludedRuns[i]);
        return (excludedRunTest = true);
      }
    }
    if (ok && !excludedRunTest) {
      console.log("Entra al true del run: ");
      for (let nMul = 2; cStr !== ""; nMul = nMul === 7 ? 2 : nMul + 1) {
        nSum += Number(cStr.slice(-1)) * nMul;
        cStr = cStr.slice(0, -1);
      }
      nVal = 11 - (nSum % 11);
      switch (nVal) {
        case 11:
          cVal = "0";
          break;
        case 10:
          cVal = "K";
          break;
        default:
          cVal = nVal.toString();
      }
      ok = cVal === cDig;
    }
    ok || run == "N/A" ? setValidRun(true) : setValidRun(false);
  };
  useEffect(() => {
    validateRun(run);
  }, [run]);
  //nombre set and validate
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  const validateNombre = (nombre) => {
    //Trimed and lowercase
    const nombreTrimedLowerCase = nombre.trim().toLowerCase();
    //no more white spaces
    const checkMultipleNames = nombreTrimedLowerCase.split(" ");
    if (checkMultipleNames.length !== 1) {
      setValidNombre(false);
    } else {
      if (regexValidPassSymbol.test(nombreTrimedLowerCase)) {
        setValidNombre(false);
      } else {
        setValidNombre(true);
      }
    }
  };
  useEffect(() => {
    validateNombre(nombre);
  }, [nombre]);
  //apellido set and validate
  const handleApellidoPaternoChange = (e) => {
    setApellidoPaterno(e.target.value);
  };
  const validateApellidoPatero = (apellidoPaterno) => {
    //Trimed and lowercase
    const apellidoPaternoTrimedLowerCase = apellidoPaterno.trim().toLowerCase();
    //no more white spaces
    if (regexValidPassSymbol.test(apellidoPaternoTrimedLowerCase)) {
      setValidApellidoPaterno(false);
    } else {
      setValidApellidoPaterno(true);
    }
  };
  useEffect(() => {
    validateApellidoPatero(apellidoPaterno);
  }, [apellidoPaterno]);
  //apellido materno set and validate
  const handleApellidoMaternoChange = (e) => {
    setApellidoMaterno(e.target.value);
  };
  const validateApellidoMaterno = (apellidoMaterno) => {
    //Trimed and lowercase
    const apellidoMaternoTrimedLowerCase = apellidoMaterno.trim().toLowerCase();
    //no more white spaces
    if (regexValidPassSymbol.test(apellidoMaternoTrimedLowerCase)) {
      setValidApellidoMaterno(false);
    } else {
      setValidApellidoMaterno(true);
    }
  };
  useEffect(() => {
    validateApellidoMaterno(apellidoMaterno);
  }, [apellidoMaterno]);
  const handleFechaNacimientoChange = (e) => {
    setFechaNacimiento(e.target.value);
  };
  //genero set and validate
  const handleCalleChange = (e) => {
    setCalle(e.target.value);
  };
  const validateCalle = (calle) => {
    //Trimed and lowercase
    const calleTrimedLowerCase = calle.trim().toLowerCase();
    //no more white spaces
    if (regexValidPassSymbol.test(calleTrimedLowerCase)) {
      setValidCalle(false);
    } else {
      setValidCalle(true);
    }
  };
  useEffect(() => {
    validateCalle(calle);
  }, [calle]);
  //numero set and validate
  const handleNumCalleChange = (e) => {
    setNumCalle(e.target.value);
  };
  const validateNumCalle = (numCalle) => {
    //Trimed and lowercase
    // const numCalleTrimed = numCalle.trim();
    //no more white spaces
    // const checkMultipleCalles = numCalleTrimed.split(" ");
    if (numCalle.isNaN) {
      setValidNumCalle(false);
    } else {
      setValidNumCalle(true);
      // if (isNaN(numCalleTrimed)) {
      //   setValidNumCalle(false);
      // } else {
      //   setValidNumCalle(true);
      // }
    }
  };
  useEffect(() => {
    validateNumCalle(numCalle);
  }, [numCalle]);
  //datos de contacto
  //telefono set and validate
  const handleCelularChange = (e) => {
    setCelular(e.target.value);
  };
  const validateCelular = (celular) => {
    //Trimed and lowercase
    const celularTrimed = celular.trim();
    //no more white spaces
    const checkMultipleCelulares = celularTrimed.split(" ");
    if (checkMultipleCelulares.length !== 1) {
      setValidCelular(false);
    } else {
      if (isNaN(celularTrimed)) {
        if (celularTrimed == "N/A") {
          setValidCelular(true);
        } else {
          setValidCelular(false);
        }
      } else {
        if (regexValidCelular.test(celularTrimed)) {
          console.log("valid cel regex");
          setValidCelular(true);
        } else {
          console.log("invalid cel regex");
          setValidCelular(false);
        }
      }
    }
  };
  useEffect(() => {
    validateCelular(celular);
  }, [celular]);
  //show password
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  //show re password
  const handleReShowPassword = (e) => {
    e.preventDefault();
    setReShowPassword(!showRePassword);
  };
  // axios.defaults.withCredentials = true;
  const store = async (e) => {
    console.log("valid mail: " + validEmail);
    console.log("valid pass: " + validPassword);
    console.log("valid nombre: " + validNombre);
    console.log("valid apellidoPaterno: " + validApellidoPaterno);
    console.log("valid apellidoMaterno: " + validApellidoMaterno);
    console.log("valid run: " + validRun);
    console.log("valid celular: " + validCelular);
    console.log("valid calle: " + validCalle);
    console.log("valid numCalle: " + validNumCalle);

    e.preventDefault();
    if (
      validEmail &&
      validPassword &&
      validNombre &&
      validApellidoPaterno &&
      validApellidoMaterno &&
      validRun &&
      validCelular &&
      validCalle &&
      validNumCalle
    ) {
      const usuarioData = {
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        run: run,
        celular: celular,
        fecha_nacimiento: fechaNacimiento,
      };
      // let cuentaData = null;
      // if (img === "") {
      console.log("entra al imga vacio" + img);
      const cuentaData = {
        user: email,
        password: password,
        profileImg: "images\\default-profile-img.jpg",
      };
      // } else {
      //   console.log("entra al imga no vacio" + img);
      //   console.log("old img en stores: " + oldImg);
      //   cuentaData = new FormData();
      //   cuentaData.append("profileImg", oldImg);
      //   cuentaData.append("user", email);
      //   cuentaData.append("password", password);
      // }

      await axios
        .put(
          URICuentas + "/usuario/access-data/" + params.id,
          cuentaData,
          config
        )
        .then((result) => {
          Swal.fire({
            text: "Actualización de datos exitosa",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      //const resp = res.id;
      //history.push('/cuentas/')
      //navigate("/");
    } else {
      alert("Uno o más campos son inválidos");
    }
  };
  // show message close by x button
  const handleCloseMessege = (e) => {
    setShowMessege(false);
  };
  //discard btn
  const cleanStates = (e) => {
    e.preventDefault();
    //foto perfil
    setImg("");
    //datos usuario
    setEmail("");
    setPassword("");
    setRePassword("");
    //datos personales
    setRun("");
    setNombre("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setFechaNacimiento("");

    setCalle("");
    setNumCalle("");
    setComuna("");
    setRegion("");
    //datos contacto
    setCelular("");
    //mensaje de exito
    setShowMessege(false);
    //show password
    setShowPassword(false);
    setReShowPassword(false);
  };
  return (
    <form
      onSubmit={store}
      className={`${actualizarRepatidorStyle["position-relative"]}`}
    >
      <div
        className={`${booststrap["container-fluid"]} ${actualizarRepatidorStyle["container-actualizar-datos-admin"]}`}
      >
        <div
          className={`${booststrap["container-fluid"]} ${actualizarRepatidorStyle["grid-span-3"]}`}
        >
          <h1>Datos de cuenta</h1>
        </div>
        <div
          className={`${booststrap["col-md-4"]} ${actualizarRepatidorStyle["flex-container"]} ${actualizarRepatidorStyle["right-side-border"]}`}
          id="datos-usuario-container"
        >
          <h2 className={`${actualizarRepatidorStyle["font-weight-bold"]}`}>
            Foto de Pefil
          </h2>
          <div className={`${actualizarRepatidorStyle["flex-container"]}`}>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="image/*"
              name="profileImg"
              id="profileImg"
            />
            <div
              className={`${actualizarRepatidorStyle["img-preview-wrapper"]} ${actualizarRepatidorStyle["flex-container"]} ${actualizarRepatidorStyle["no-margin-bottom"]}`}
            >
              <img
                src={preview}
                className={`${actualizarRepatidorStyle["img-preview"]}`}
                alt="profile-img"
              />
              <button
                className={`${booststrap["btn"]}  ${booststrap["btn-primary"]} ${booststrap["mt-2"]} ${actualizarRepatidorStyle["img-preview-btn"]} ${actualizarRepatidorStyle["btn-primary-color"]}`}
                disabled={true}
                onClick={handleFileInput}
              >
                Actualizar
              </button>
            </div>
            {/* <div
              className={`${actualizarRepatidorStyle["img-preview-wrapper"]} ${actualizarRepatidorStyle["flex-container"]} ${actualizarRepatidorStyle["no-margin-bottom"]}`}
            >
              <img
                src={`http://localhost:8080/${preview}`}
                className={`${actualizarRepatidorStyle["img-preview"]}`}
                alt="profile-img"
              />
              <button
                className={`${booststrap["btn"]} ${booststrap["btn-primary"]} ${booststrap["mt-2"]} ${actualizarRepatidorStyle["img-preview-btn"]}`}
                onClick={handleFileInput}
              >
                Actualizar
              </button>
            </div> */}
          </div>
          <h2 className={`${actualizarRepatidorStyle["font-weight-bold"]}`}>
            Datos de usuario
          </h2>
          <div>
            <label htmlFor="email" className={`${booststrap["form-label"]}`}>
              Email:
            </label>
            <input
              type="email"
              disabled={edit === true ? false : true}
              className={
                email === ""
                  ? `${booststrap["form-control"]}`
                  : validEmail
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="email@examaple.com"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validEmail || email === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            El email ingresado no es válido
          </div>
          <div>
            <label htmlFor="password" className={`${booststrap["form-label"]}`}>
              Nueva contraseña:
            </label>
            <div className={`${actualizarRepatidorStyle["pass-container"]}`}>
              <input
                type={showPassword ? "text" : "password"}
                disabled={edit === true ? false : true}
                className={
                  password === ""
                    ? `${booststrap["form-control"]} ${booststrap["pe-4"]}`
                    : validPassword
                    ? `${booststrap["form-control"]} ${booststrap["pe-4"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                    : `${booststrap["form-control"]} ${booststrap["pe-4"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
                }
                id="password"
                onChange={handlePasswordChange}
                value={password}
                required
              />
              <i
                className={
                  showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                }
                onClick={handleShowPassword}
              />
            </div>
          </div>
          <div class="requirements">
            <ul>
              <li
                id="length"
                className={
                  password === ""
                    ? `${actualizarRepatidorStyle["valid-message-default"]}`
                    : validPassword8Char
                    ? `${actualizarRepatidorStyle["valid-message"]}`
                    : `${actualizarRepatidorStyle["invalid-message"]}`
                }
              >
                Mínimo 8 caracteres
              </li>
              <li
                id="uppercase"
                className={
                  password === ""
                    ? `${actualizarRepatidorStyle["valid-message-default"]}`
                    : validPasswordUpperCase
                    ? `${actualizarRepatidorStyle["valid-message"]}`
                    : `${actualizarRepatidorStyle["invalid-message"]}`
                }
              >
                Mínimo una mayúscula (A-Z)
              </li>
              <li
                id="lowercase"
                className={
                  password === ""
                    ? `${actualizarRepatidorStyle["valid-message-default"]}`
                    : validPasswordLowerCase
                    ? `${actualizarRepatidorStyle["valid-message"]}`
                    : `${actualizarRepatidorStyle["invalid-message"]}`
                }
              >
                Mínimo una minúscula (a-z)
              </li>
              <li
                id="numbers"
                className={
                  password === ""
                    ? `${actualizarRepatidorStyle["valid-message-default"]}`
                    : validPasswordNumbers
                    ? `${actualizarRepatidorStyle["valid-message"]}`
                    : `${actualizarRepatidorStyle["invalid-message"]}`
                }
              >
                Mínimo un número (0-9)
              </li>
              <li
                id="symbols"
                className={
                  password === ""
                    ? `${actualizarRepatidorStyle["valid-message-default"]}`
                    : validPasswordSybmbos
                    ? `${actualizarRepatidorStyle["valid-message"]}`
                    : `${actualizarRepatidorStyle["invalid-message"]}`
                }
              >
                Mínimo un símbolo (!, #, $, etc.)
              </li>
            </ul>
          </div>
          <div>
            <label
              htmlFor="rePassword"
              className={`${booststrap["form-label"]}`}
            >
              Confirmar contraseña:
            </label>
            <div className={`${actualizarRepatidorStyle["pass-container"]}`}>
              <input
                type={showRePassword ? "text" : "password"}
                disabled={edit === true ? false : true}
                className={
                  rePassword === ""
                    ? `${booststrap["form-control"]} ${booststrap["pe-4"]}`
                    : validPassword
                    ? `${booststrap["form-control"]} ${booststrap["pe-4"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                    : `${booststrap["form-control"]} ${booststrap["pe-4"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
                }
                id="rePassword"
                onChange={handleRePasswordChange}
                value={rePassword}
                autoComplete="off"
                required
              />
              <i
                className={
                  showRePassword
                    ? "fa-solid fa-eye-slash eye-close"
                    : "fa-solid fa-eye eye-open"
                }
                onClick={handleReShowPassword}
              />
            </div>
          </div>
          <div
            className={
              validPassword || password === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            Las contraseñas no coninciden
          </div>
        </div>
        <div
          className={`${booststrap["col-md-4"]} ${actualizarRepatidorStyle["flex-container"]} ${actualizarRepatidorStyle["space-between"]}`}
        >
          <h2 className={`${actualizarRepatidorStyle["font-weight-bold"]}`}>
            Datos Personales
          </h2>
          <div>
            <label htmlFor="rut-empresa" className="form-label">
              RUN:
            </label>
            <input
              type="text"
              disabled={true}
              className={
                run === ""
                  ? `${booststrap["form-control"]}`
                  : validRun
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="rut-empresa"
              onChange={handleRunChange}
              value={run}
              placeholder="11.111.111-1 o 11111111-1 o 111111111"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validRun || run === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            El run ingresado no es válido
          </div>
          <div>
            <label
              htmlFor="nombre-empresa"
              className={`${booststrap["form-label"]}`}
            >
              Nombre:
            </label>
            <input
              type="text"
              disabled={true}
              className={
                nombre === ""
                  ? `${booststrap["form-control"]}`
                  : validNombre
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="nombre-empresa"
              onChange={handleNombreChange}
              value={nombre}
              placeholder="Jhon"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validNombre || nombre === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            El nombre ingresado no es válido
          </div>
          <div>
            <label
              htmlFor="apellido-paterno"
              className={`${booststrap["form-label"]}`}
            >
              Apellido paterno:
            </label>
            <input
              type="text"
              disabled={true}
              className={
                apellidoPaterno === ""
                  ? `${booststrap["form-control"]}`
                  : validApellidoPaterno
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="apellido-paterno"
              onChange={handleApellidoPaternoChange}
              value={apellidoPaterno}
              placeholder="Doe"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validApellidoPaterno || apellidoPaterno === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            El apellido paterno ingresado no es válido
          </div>
          <div>
            <label htmlFor="apellido-materno" className="form-label">
              Apellido materno:
            </label>
            <input
              type="text"
              disabled={true}
              className={
                apellidoMaterno === ""
                  ? `${booststrap["form-control"]}`
                  : validApellidoMaterno
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="apellido-materno"
              onChange={handleApellidoMaternoChange}
              value={apellidoMaterno}
              placeholder="Smith"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validApellidoMaterno || apellidoMaterno === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            El apellido materno ingresado no es válido
          </div>
          <div>
            <label
              htmlFor="fecha-nacimiento"
              className={`${booststrap["form-label"]}`}
            >
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              disabled={true}
              className={
                fechaNacimiento === ""
                  ? `${booststrap["form-control"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
              }
              id="fecha-nacimiento"
              onChange={handleFechaNacimientoChange}
              value={fechaNacimiento}
              required
            />
            <div
              className={`${actualizarRepatidorStyle["valid-message-hidden"]}`}
            >
              La calle ingresada no es válida
            </div>
          </div>
          <div>
            <label htmlFor="calle" className={`${booststrap["form-label"]}`}>
              Calle:
            </label>
            <input
              type="text"
              disabled={true}
              className={
                calle === ""
                  ? `${booststrap["form-control"]}`
                  : validCalle
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="calle"
              onChange={handleCalleChange}
              value={calle}
              placeholder="Av. siempre viva"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validCalle || calle === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            La calle ingresada no es válida
          </div>
          <div>
            <label htmlFor="numCalle" className={`${booststrap["form-label"]}`}>
              N° calle:
            </label>
            <input
              type="number"
              disabled={true}
              className={
                numCalle === ""
                  ? `${booststrap["form-control"]}`
                  : validNumCalle
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="numCalle"
              onChange={handleNumCalleChange}
              value={numCalle}
              placeholder="742"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validNumCalle || numCalle === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            El número de calle ingresada no es válido
          </div>
          <div>
            <label htmlFor="regiones" className={`${booststrap["form-label"]}`}>
              Region:
            </label>
            <select
              disabled={true}
              className={
                region === ""
                  ? `${booststrap["form-select"]}`
                  : `${booststrap["form-select"]} ${actualizarRepatidorStyle["valid-input-border"]}`
              }
              id="regiones"
              onChange={handleRegionChange}
              value={region}
              required={edit === true ? false : true}
            >
              <option value="">Seleccione una región</option>
              {mapRegion(RegionesYcomunas)}
            </select>
          </div>
          <div
            className={`${actualizarRepatidorStyle["valid-message-hidden"]}`}
          >
            nothing here
          </div>
          <div>
            <label htmlFor="comunas" className={`${booststrap["form-label"]}`}>
              Comuna:
            </label>
            <br />
            <select
              disabled={true}
              className={
                comuna === ""
                  ? `${booststrap["form-select"]}`
                  : `${booststrap["form-select"]} ${actualizarRepatidorStyle["valid-input-border"]}`
              }
              id="comunas"
              onChange={handleComunaChange}
              value={comuna}
              required={edit === true ? false : true}
            >
              <option value="">Seleccione una comuna</option>
              {mapComuna(RegionesYcomunas)}
            </select>
          </div>
        </div>
        <div
          className={`${booststrap["col-md-4"]} ${actualizarRepatidorStyle["flex-container"]} ${actualizarRepatidorStyle["space-between"]}`}
        >
          <h2 className={`${actualizarRepatidorStyle["font-weight-bold"]}`}>
            Datos de contacto
          </h2>
          <div>
            <label
              htmlFor="numero-celular"
              className={`${booststrap["form-label"]}`}
            >
              N° Celular:
            </label>
            <input
              type="tel"
              disabled={true}
              className={
                celular === ""
                  ? `${booststrap["form-control"]}`
                  : validCelular
                  ? `${booststrap["form-control"]} ${actualizarRepatidorStyle["valid-input-border"]}`
                  : `${booststrap["form-control"]} ${actualizarRepatidorStyle["invalid-input-border"]}`
              }
              id="numero-celular"
              onChange={handleCelularChange}
              value={celular}
              placeholder=" 12345678"
              autoComplete="off"
              required
            />
          </div>
          <div
            className={
              validCelular || celular === ""
                ? `${actualizarRepatidorStyle["valid-message-hidden"]}`
                : `${actualizarRepatidorStyle["invalid-message"]}`
            }
          >
            El número de calle ingresada no es válido
          </div>
        </div>
        <div
          className={`${actualizarRepatidorStyle["flex-container"]} ${booststrap["flex-row"]} ${booststrap["gap-2"]} ${booststrap["justify-content-around"]} ${actualizarRepatidorStyle["grid-span-1"]} ${actualizarRepatidorStyle["container-btn-crear-repatidor"]}`}
        >
          <button
            type="submit"
            disabled={edit === true ? false : true}
            className={`${booststrap["btn"]} ${booststrap["btn-primary"]} ${booststrap["mt-2"]} ${actualizarRepatidorStyle["btn-primary-color"]}`}
          >
            Guardar cambios
          </button>
          <button
            type="reset"
            className={`${booststrap["btn"]} ${booststrap["btn-danger"]} ${booststrap["mt-2"]}`}
            onClick={cleanStates}
          >
            Limpiar campos
          </button>
          <button
            className={`${booststrap["btn"]} ${booststrap["btn-primary"]} ${booststrap["mt-2"]} ${actualizarRepatidorStyle["btn-primary-color"]}`}
            onClick={(e) => {
              e.preventDefault();
              if (!edit) {
                Swal.fire({
                  text: "Edición habilitada",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setEdit(!edit);
              } else {
                Swal.fire({
                  text: "Edición desabilitada",
                  icon: "warning",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setEdit(!edit);
              }
            }}
          >
            Editar
          </button>
        </div>
        <div
          //className="card grid-span-1 submit-successful-hidden"
          className={
            showMessege
              ? `${booststrap["card"]} ${actualizarRepatidorStyle["grid-span-1"]} ${actualizarRepatidorStyle["submit-successful-show"]} ${actualizarRepatidorStyle["fadeIn"]}`
              : `${booststrap["card"]} ${actualizarRepatidorStyle["grid-span-1"]} ${actualizarRepatidorStyle["submit-successful-hidden"]} ${actualizarRepatidorStyle["fadeIn"]}`
          }
        >
          <p>Se ha creado la cuenta de forma satisfactoria!</p>
          <i className="fa-solid fa-xmark" onClick={handleCloseMessege}></i>
        </div>
      </div>
      <div className={`${actualizarRepatidorStyle["divider"]}`}></div>
      <div
        className={`${actualizarRepatidorStyle["custom-shape-divider-bottom-1656548343"]}`}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className={`${actualizarRepatidorStyle["shape-fill"]}`}
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className={`${actualizarRepatidorStyle["shape-fill"]}`}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className={`${actualizarRepatidorStyle["shape-fill"]}`}
          ></path>
        </svg>
      </div>
    </form>
  );
}
export default ActualizarDatosAccesoAdmin;
