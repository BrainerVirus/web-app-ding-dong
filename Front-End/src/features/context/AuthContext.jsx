import React from "react";
import axios from "axios";
import { useState, useContext, useEffect, createContext } from "react";

// const URI = "http://localhost:8080/cuentas/login/status";
// const URITipoUsuario = "http://localhost:8080/tipoUsuario/usuario/";

const AuthContext = React.createContext({});

export function AuthProvider(props) {
  const getSession = async () => {
    const id = await localStorage.getItem("id");
    const role = await localStorage.getItem("tipoUsuario");
    const isLogged = await localStorage.getItem("isLogged");
    console.log("id localStorage app js: " + id);
    console.log("role localStorage app js: " + role);
    console.log("logged localStorage app js: " + isLogged);
  };
  useEffect(() => {
    getSession();
    console.log("useEffect montado en auth provider");
  }, []);
  return (
    <AuthContext.Provider
      value={{
        id: "id",
        isLogged: "isLogged",
        tipoUsuario: "tipoUsuario",
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);
