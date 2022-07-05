import axios from "axios";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mostrarRepartidores from "./MostrarCalificacionesRepartidorStyle.module.scss";
import booststrap from "../../../../scss/Global/bootstrap.min.module.css";

const URICuentas = "http://localhost:8080/cuentas/";
const URIUsuarios = "http://localhost:8080/usuario/";
const URIDirecciones = "http://localhost:8080/direccion/";
const URITipoUsuario = "http://localhost:8080/tipoUsuario/";

function AdministradorMostrarRepartidores() {
  const [cuentas, setCuentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [userLookup, setUserLookup] = useState("");
  const [userForTable, setUserForTable] = useState([]);
  const [isDeleteted, setIsDeleted] = useState(false);
  const columns = [
    { name: "Run", selector: (row) => row.run },
    {
      name: "Usuario",
      selector: (row) => row.user,
    },
    { name: "Nombre", selector: (row) => row.nombre },
    { name: "Apellido Paterno", selector: (row) => row.apellidoPaterno },
    { name: "Apellido Materno", selector: (row) => row.apellidoMaterno },
  ];
  //getting data from backend
  useEffect(() => {
    getAllAccounts();
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllUsers();
    getAllAccounts();
    //setUserInfoInAccount();
  }, [isDeleteted]);
  axios.defaults.withCredentials = true;
  const getAllAccounts = async () => {
    const response = await axios.get(URICuentas);
    setCuentas(response.data);
    setIsDeleted();
  };

  useEffect(() => {
    getAllUsers();
    getAllAccounts();
  }, []);

  useEffect(() => {
    setUserInfoInAccount();
    //filterRepartidor();
  }, [cuentas]);

  const getAllUsers = async () => {
    const response = await axios.get(URIUsuarios);
    setUsuarios(response.data);
    setIsDeleted();
  };

  const deleteAccount = async (id) => {
    await axios
      .delete(URITipoUsuario + "usuario/" + id, {
        withCredentials: true,
        credentials: "include",
      })
      .then(() => {
        axios.delete(URIDirecciones + "usuario/" + id);
      })
      .then(() => {
        axios.delete(URICuentas + "usuario/" + id);
      })
      .then(() => {
        axios.delete(URIUsuarios + "/" + id);
      });
    //getAllAccounts();
    setIsDeleted(true);

    //await axios.delete(URITipoUsuario + "usuario/" + id);
    //await axios.delete(URIDirecciones + "usuario/" + id);
    //await axios.delete(URIUsuarios + "usuario/" + id);
  };

  const setUserInfoInAccount = () => {
    const testArray = [];
    cuentas.map((cuenta) => {
      usuarios.map((usuario) => {
        if (usuario.id === cuenta.usuarioId) {
          cuenta.nombre = usuario.nombre;
          cuenta.apellidoPaterno = usuario.apellidoPaterno;
          cuenta.apellidoMaterno = usuario.apellidoMaterno;
          cuenta.run = usuario.run;
          testArray.push(cuenta);
        }
      });
    });
    setUserForTable(testArray);
  };

  const ExpandedComponent = ({ data }) => (
    <>
      <div className={`${mostrarRepartidores["actions-column"]}`}>
        <div className={`${mostrarRepartidores["flex-container"]}`}>
          <p>Imagen de perfil:</p>
          <img
            src={`http://localhost:8080/${data.profileImg}`}
            alt="Imagen de perfil"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        </div>
        <div
          className={`${mostrarRepartidores["flex-container"]} ${mostrarRepartidores["btn-wrapper"]}`}
        >
          <p>Acciones:</p>
          <Link
            to={`/cuenta/administrador/update/repartidor/${data.usuarioId}`}
            className={`${booststrap["btn"]} ${booststrap["btn-info"]} ${booststrap["me-2"]} ${mostrarRepartidores["custom-btn-primary"]}`}
          >
            Editar
          </Link>
          <button
            onClick={() => deleteAccount(data.usuarioId)}
            className={`${booststrap["btn"]} ${booststrap["btn-danger"]}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );

  const filterRepartidor = (userForTable) => {
    return userForTable.filter(
      (user) => user.run.toLowerCase().indexOf(userLookup) > -1
    );
  };

  const handleChange = (e) => {
    setUserLookup(e.target.value);
  };
  return (
    <div
      className={`${booststrap["container-fluid"]} ${mostrarRepartidores["content-wrapper"]}`}
    >
      <div
        className={`${mostrarRepartidores["flex-container"]} ${mostrarRepartidores["center-page-content"]}`}
      >
        <div
          className={`${booststrap["input-group"]} ${booststrap["mt-3"]} ${booststrap["mb-3"]}`}
        >
          <input
            type="text"
            className={`${booststrap["form-control"]}`}
            onChange={handleChange}
            value={userLookup}
            placeholder="Run del repartidor..."
          />
          <Link
            className={`${booststrap["btn"]} ${booststrap["btn-outline-secondary"]} ${mostrarRepartidores["custom-btn-primary"]}`}
            type="button"
            to="/cuenta/administrador/add/repartidor"
          >
            Crear
          </Link>
        </div>
        <div
          className={` ${mostrarRepartidores["scrollme"]} ${mostrarRepartidores["show-repartidores-table"]}`}
        >
          <DataTable
            columns={columns}
            data={filterRepartidor(userForTable)}
            pagination={true}
            paginationPerPage={5}
            expandableRows={true}
            expandableRowsComponent={ExpandedComponent}
          />
        </div>
        <div className={`${mostrarRepartidores["divider"]}`}></div>
      </div>
      <div
        className={`${mostrarRepartidores["custom-shape-divider-bottom-1656548343"]}`}
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
            className={`${mostrarRepartidores["shape-fill"]}`}
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className={`${mostrarRepartidores["shape-fill"]}`}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className={`${mostrarRepartidores["shape-fill"]}`}
          ></path>
        </svg>
      </div>
    </div>
  );
}
export default AdministradorMostrarRepartidores;

//AdministradorMostrarRepartidores
