import "./App.scss";
import Footer from "./features/Footer/Footer";
import Login from "./features/Login/Login";
import Home from "./features/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/Header/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Home />
                <Footer />
              </div>
            }
          />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
