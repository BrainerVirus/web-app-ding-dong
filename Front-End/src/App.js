import "./App.scss";
import Footer from "./features/Footer/Footer";
import Login from "./features/Login/Login";
import Home from "./features/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/Header/Navbar";
import AdministradorHome from "./features/Mantenedores/Administrador/AdministradorHome";

function App() {
  return (
    <div className="App" id="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/Home"
            element={
              <>
                <Navbar />
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/usuario/administrador"
            element={<AdministradorHome />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
