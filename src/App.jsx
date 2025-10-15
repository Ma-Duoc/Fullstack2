import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import Inicio from "./pages/inicio";
import Login from "./pages/login";
import Registro from "./pages/registro";
import Recuperar from "./pages/recuperar";
import Preguntas from "./pages/preguntas";
import Perfil from "./pages/perfil";
import Dashboard from "./pages/dashboard";
import Citas from "./pages/citas";
import HistorialMedico from "./pages/historial";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Página principal */}
        <Route path="/" element={<Navigate to="/inicio" />} />

        {/* 🔐 Autenticación */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* 💬 Otras secciones */}
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* 🩺 Área principal del usuario */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/historial" element={<HistorialMedico />} />

        {/* 🚫 Si no existe la ruta */}
        <Route path="*" element={<h1 className="text-center mt-5">404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;



