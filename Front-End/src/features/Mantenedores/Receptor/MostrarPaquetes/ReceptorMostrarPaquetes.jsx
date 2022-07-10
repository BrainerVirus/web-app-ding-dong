import axios from "axios";
import DataTable from "react-data-table-component";
import { useState, useEffect, useRef } from "react";
import mostrarRepartidores from "./MostrarPaquetesReceptorStyle.module.scss";
import booststrap from "../../../../scss/Global/bootstrap.min.module.css";
import fileDownload from "js-file-download";

const URIAllPackagesByUserId =
  "http://localhost:8080/paquete/usuario/all-packages/";
const URIAllQRsByUserId = "http://localhost:8080/qr/usuario/all-qrs/";

function AdministradorMostrarRepartidores() {
  const [packages, setPackages] = useState([]);
  const [qrs, setQRs] = useState([]);
  const [packagesAndQRs, setPackagesAndQRs] = useState([]);
  const [userLookup, setUserLookup] = useState("");
  const [isfilterByStatus, setIsFilterByStatus] = useState("todos");
  //axios config
  axios.defaults.withCredentials = false;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const filterByStatus = useRef();
  //data table columns
  const columns = [
    { name: "Código Paquete", selector: (row) => row.id },
    { name: "Estado", selector: (row) => row.status },
  ];
  //getting data from backend
  useEffect(() => {
    getAllPackagesByUserId();
    getAllQRsByUserId();
    defineAllPackagesAndQRsByUserId();
  }, []);

  useEffect(() => {
    defineAllPackagesAndQRsByUserId();
  }, [packages, qrs]);

  const getAllPackagesByUserId = async () => {
    const response = await axios.get(
      URIAllPackagesByUserId + localStorage.getItem("id"),
      config
    );
    setPackages(response.data);
  };
  const getAllQRsByUserId = async () => {
    const response = await axios.get(
      URIAllQRsByUserId + localStorage.getItem("id"),
      config
    );
    setQRs(response.data);
  };
  const defineAllPackagesAndQRsByUserId = () => {
    const tempArr = [];
    packages.forEach((parcel) => {
      qrs.forEach((qr) => {
        if (parcel.usuarioId === qr.usuarioId && parcel.id === qr.paqueteId) {
          setPackagesAndQRs([...packagesAndQRs, qr]);
          parcel.qrId = qr.id;
          console.log("este es el estado en promise: " + parcel.status);
          tempArr.push(parcel);
          console.log("parcel qr id: " + parcel.qrId);
          console.log("parcel qr id en arr: " + tempArr[0].qrId);
          console.log("parcel qr id en arr status: " + tempArr[0].status);
          setPackagesAndQRs(tempArr);
          console.log("QR id: " + qr.id);
        }
      });
    });
  };

  const ExpandedComponent = ({ data }) => (
    <>
      <div className={`${mostrarRepartidores["actions-column"]}`}>
        <div className={`${mostrarRepartidores["flex-container"]}`}>
          <p>Código para validación de identidad:</p>
          {console.log("qr id en datas: " + data.qrId)}
          <img
            src={`http://localhost:8080/qr/identidad/${data.qrId}.png`}
            alt="Imagen de perfil"
            style={{ width: 150, height: 150 }}
          />
        </div>
        <div
          className={`${mostrarRepartidores["flex-container"]} ${mostrarRepartidores["btn-wrapper"]}`}
        >
          <p>Acciones:</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              axios
                .get(
                  `http://localhost:8080/qr/identidad/${data.qrId}.png`,
                  {
                    responseType: "blob",
                  },
                  config
                )
                .then((res) => fileDownload(res.data, "identificadorQR.png"));
            }}
            className={`${booststrap["btn"]} ${booststrap["btn-danger"]}`}
          >
            Descargar QR
          </button>
        </div>
      </div>
    </>
  );

  const filterPackage = (packages) => {
    if (isfilterByStatus === "todos") {
      return packages.filter(
        (parcel) => parcel.id.toLowerCase().indexOf(userLookup) > -1
      );
    }
    if (isfilterByStatus !== "finalizados") {
      return packages.filter(
        (parcel) => parcel.status.toLowerCase().indexOf("finalizados") === -1
      );
    }
    if (isfilterByStatus === "finalizados") {
      return packages.filter(
        (parcel) => parcel.status.toLowerCase().indexOf("finalizados") > -1
      );
    }
  };

  // const filterPackage = (packages) => {
  //   if (filterByStatus.current.value === "Todos") {
  //     return packages.filter(
  //       (parcel) => parcel.id.toLowerCase().indexOf(userLookup) > -1
  //     );
  //   }
  //   if (filterByStatus.current.value === "Activos") {
  //     return packages.filter(
  //       (parcel) =>
  //         parcel.status.toLowerCase().indexOf(packageStatusArray[4]) === -1
  //     );
  //   }
  //   if (filterByStatus.current.value === "Finalizados") {
  //     return packages.filter(
  //       (parcel) =>
  //         parcel.status.toLowerCase().indexOf(packageStatusArray[4]) > -1
  //     );
  //   }
  // };

  // useEffect(() => {
  //   filterPackage();
  // }, [userLookup, filterByStatus.current.value]);

  const handleChange = (e) => {
    setUserLookup(e.target.value);
  };
  //addPaqueteHandler

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
            placeholder="Código identificador del paquete..."
          />
          <div>
            <select
              ref={filterByStatus}
              onChange={(e) => {
                setIsFilterByStatus(e.target.value);
              }}
              className={`${booststrap["form-select"]}`}
            >
              <option selected value="todos">
                Todos
              </option>
              <option value="activos">Activos</option>
              <option value="finalizados">Finalizados</option>
            </select>
          </div>
        </div>
        <div
          className={` ${mostrarRepartidores["scrollme"]} ${mostrarRepartidores["show-repartidores-table"]}`}
        >
          <DataTable
            columns={columns}
            data={filterPackage(packagesAndQRs)}
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
