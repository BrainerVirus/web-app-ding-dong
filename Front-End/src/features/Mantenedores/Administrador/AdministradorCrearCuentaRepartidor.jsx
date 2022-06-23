import React from "react";
import axios from "axios";
import "../../../scss/features/Administrador/AgregarRepartidorAdminStyle.scss";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import defultProfileImg from "../../../img/profile/default-profile-img.jpeg";
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
function AdministradorCrearCuentaRepartidor() {
  //----------------------------------------------------------
  //form states
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
  const tipoUsuario = "repartidor";
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
    var patt = /^\d{1,8}[0-9K]$/;
    var ok = patt.test(run);
    var cStr = run.slice(0, -1);
    var cDig = run.slice(-1);
    var nSum = 0;
    var nVal = 0;
    var cVal = "";
    console.log("run equals excluded: " + run);
    let excludedRunTest = false;
    for (let i = 0; i < excludedRuns.length; i++) {
      if (run == excludedRuns[i]) {
        console.log("Entra al false del run: ");
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
    ok ? setValidRun(true) : setValidRun(false);
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
        setNombre(nombreTrimedLowerCase);
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
    const numCalleTrimed = numCalle.trim();
    //no more white spaces
    const checkMultipleCalles = numCalleTrimed.split(" ");
    if (checkMultipleCalles.length !== 1) {
      setValidNumCalle(false);
    } else {
      if (isNaN(numCalleTrimed)) {
        setValidNumCalle(false);
      } else {
        setValidNumCalle(true);
      }
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
        setValidCelular(false);
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
    console.log("valid mail: " + validEmail);
    console.log("valid pass: " + validPassword);
    console.log("valid nombre: " + validNombre);
    console.log("valid apellidoPaterno: " + validApellidoPaterno);
    console.log("valid apellidoMaterno: " + validApellidoMaterno);
    console.log("valid run: " + validRun);
    console.log("valid celular: " + validCelular);
    //console.log("valid fechaNacimiento: " + validFechaNacimiento);
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
          //messege success
          cleanStates(e);
          handleShowMessege();
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
  // show message after submit
  const handleShowMessege = (e) => {
    setShowMessege(!showMessege);
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
    <form onSubmit={store}>
      <div className="container-fluid container-actualizar-datos-admin">
        <div className="container-fluid grid-span-3">
          <h1>Crear cuenta de repartidor</h1>
        </div>
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
                <button
                  className="btn btn-primary img-preview-btn mt-2 hidden-btn"
                  onClick={handleFileInput}
                >
                  Actualizar
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
              className={
                email === ""
                  ? "form-control"
                  : validEmail
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            El email ingresado no es válido
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Nueva contraseña:
            </label>
            <div className="pass-container">
              <input
                type={showPassword ? "text" : "password"}
                className={
                  password === ""
                    ? "form-control"
                    : validPassword
                    ? "form-control valid-input-border"
                    : "form-control invalid-input-border"
                }
                id="password"
                onChange={handlePasswordChange}
                value={password}
                required
              />
              <i className="fa-solid fa-eye" onClick={handleShowPassword} />
            </div>
          </div>
          <div class="requirements">
            <ul>
              <li
                id="length"
                className={
                  password === ""
                    ? "valid-message-default"
                    : validPassword8Char
                    ? "valid-message"
                    : "invalid-message"
                }
              >
                Mínimo 8 caracteres
              </li>
              <li
                id="uppercase"
                className={
                  password === ""
                    ? "valid-message-default"
                    : validPasswordUpperCase
                    ? "valid-message"
                    : "invalid-message"
                }
              >
                Mínimo una mayúscula (A-Z)
              </li>
              <li
                id="lowercase"
                className={
                  password === ""
                    ? "valid-message-default"
                    : validPasswordLowerCase
                    ? "valid-message"
                    : "invalid-message"
                }
              >
                Mínimo una minúscula (a-z)
              </li>
              <li
                id="numbers"
                className={
                  password === ""
                    ? "valid-message-default"
                    : validPasswordNumbers
                    ? "valid-message"
                    : "invalid-message"
                }
              >
                Mínimo un número (0-9)
              </li>
              <li
                id="symbols"
                className={
                  password === ""
                    ? "valid-message-default"
                    : validPasswordSybmbos
                    ? "valid-message"
                    : "invalid-message"
                }
              >
                Mínimo un símbolo (!, #, $, etc.)
              </li>
            </ul>
          </div>
          <div>
            <label htmlFor="rePassword" className="form-label">
              Confirmar contraseña:
            </label>
            <div className="pass-container">
              <input
                type={showRePassword ? "text" : "password"}
                className={
                  rePassword === ""
                    ? "form-control"
                    : validPassword
                    ? "form-control valid-input-border"
                    : "form-control invalid-input-border"
                }
                id="rePassword"
                onChange={handleRePasswordChange}
                value={rePassword}
                autoComplete="off"
                required
              />
              <i className="fa-solid fa-eye" onClick={handleReShowPassword} />
            </div>
          </div>
          <div
            className={
              validPassword || password === ""
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            Las contraseñas no coninciden
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
              className={
                run === ""
                  ? "form-control"
                  : validRun
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            El run ingresado no es válido
          </div>
          <div>
            <label htmlFor="nombre-empresa" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className={
                nombre === ""
                  ? "form-control"
                  : validNombre
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            El nombre ingresado no es válido
          </div>
          <div>
            <label htmlFor="apellido-paterno" className="form-label">
              Apellido paterno:
            </label>
            <input
              type="text"
              className={
                apellidoPaterno === ""
                  ? "form-control"
                  : validApellidoPaterno
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
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
              className={
                apellidoMaterno === ""
                  ? "form-control"
                  : validApellidoMaterno
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            El apellido materno ingresado no es válido
          </div>
          <div>
            <label htmlFor="fecha-nacimiento" className="form-label">
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              className={
                fechaNacimiento === ""
                  ? "form-control"
                  : "form-control valid-input-border"
              }
              id="fecha-nacimiento"
              onChange={handleFechaNacimientoChange}
              value={fechaNacimiento}
              required
            />
            <div className="valid-message-hidden">
              La calle ingresada no es válida
            </div>
          </div>
          <div>
            <label htmlFor="calle" className="form-label">
              Calle:
            </label>
            <input
              type="text"
              className={
                calle === ""
                  ? "form-control"
                  : validCalle
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            La calle ingresada no es válida
          </div>
          <div>
            <label htmlFor="numCalle" className="form-label">
              N° calle:
            </label>
            <input
              type="text"
              className={
                numCalle === ""
                  ? "form-control"
                  : validNumCalle
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            El número de calle ingresada no es válido
          </div>
          <div>
            <label htmlFor="regiones" className="form-label">
              Region:
            </label>
            <select
              className={
                region === "" ? "form-select" : "form-select valid-input-border"
              }
              id="regiones"
              onChange={handleRegionChange}
              value={region}
              required
            >
              <option value="">Seleccione una región</option>
              {mapRegion(RegionesYcomunas)}
            </select>
          </div>
          <div className="valid-message-hidden">nothing here</div>
          <div>
            <label htmlFor="comunas" className="form-label">
              Comuna:
            </label>
            <br />
            <select
              className={
                comuna === "" ? "form-select" : "form-select valid-input-border"
              }
              id="comunas"
              onChange={handleComunaChange}
              value={comuna}
              required
            >
              <option value="">Seleccione una comuna</option>
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
              className={
                celular === ""
                  ? "form-control"
                  : validCelular
                  ? "form-control valid-input-border"
                  : "form-control invalid-input-border"
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
                ? "valid-message-hidden"
                : "invalid-message"
            }
          >
            El número de calle ingresada no es válido
          </div>
        </div>
        <div className="flex-container flex-row gap-2 justify-content-around grid-span-1">
          <button type="submit" className="btn btn-primary mt-2">
            Guardar cambios
          </button>
          <button
            type="reset"
            className="btn btn-danger mt-2"
            onClick={cleanStates}
          >
            Descartar cambios
          </button>
        </div>
        <div
          //className="card grid-span-1 submit-successful-hidden"
          className={
            showMessege
              ? "card grid-span-1 submit-successful-show fadeIn"
              : "card grid-span-1 submit-successful-hidden fadeIn"
          }
        >
          <p>Se ha creado la cuenta de forma satisfactoria!</p>
          <i className="fa-solid fa-xmark" onClick={handleCloseMessege}></i>
        </div>
      </div>
    </form>
  );
}

export default AdministradorCrearCuentaRepartidor;
