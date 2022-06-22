import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URICuentas = "http://localhost:8080/cuentas/";
const URIUsuarios = "http://localhost:8080/usuario/";
const URIDirecciones = "http://localhost:8080/direccion/";
const URITipoUsuario = "http://localhost:8080/tipoUsuario/";

function AdministradorMostrarRepartidores() {
  const [cuentas, setCuentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isDeleteted, setIsDeleted] = useState(false);

  useEffect(() => {
    getAllAccounts();
  }, []);

  useEffect(() => {
    getAllAccounts();
  }, [isDeleteted]);

  const getAllAccounts = async () => {
    const response = await axios.get(URICuentas);
    setCuentas(response.data);
    setIsDeleted();
  };

  const getAllUsers = async () => {
    const response = await axios.get(URIUsuarios);
    setUsuarios(response.data);
    setIsDeleted();
  };

  const deleteAccount = async (id) => {
    console.log("delete account: " + id);
    await axios
      .delete(URITipoUsuario + "usuario/" + id)
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

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link
            to="/cuenta/administrador/add/repartidor"
            className="btn btn-primary mt-2 mb-2"
          >
            Crear
          </Link>
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th>User</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cuentas.map((account) => (
                <tr key={account.id}>
                  <td>{account.user}</td>
                  <td>{account.password}</td>
                  <td>
                    <Link to={`/edit/${account.id}`} className="btn btn-info">
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteAccount(account.usuarioId)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdministradorMostrarRepartidores;

//AdministradorMostrarRepartidores
