import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import Inicio from "./pages/inicio";
import Login from "./pages/login";
import Registro from "./pages/Registro";
import Recuperar from "./pages/recuperar";
import Preguntas from "./pages/preguntas";

import Dashboard from "./pages/dashboard";
import Citas from "./pages/citas";
import HistorialMedico from "./pages/historial";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/inicio" />} />

        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<Recuperar />} />

        <Route path="/preguntas" element={<Preguntas />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/historial" element={<HistorialMedico />} />


        <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;



