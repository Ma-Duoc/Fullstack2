import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HistorialMedico = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const historial = [
    {
      fecha: "2025-08-15",
      especialista: "Dra. Fernanda Muñoz (Cardióloga)",
      diagnostico: "Chequeo general, sin hallazgos graves.",
      tipo: "Informes",
    },
    {
      fecha: "2025-07-30",
      especialista: "Dr. Luis Pérez (Dermatólogo)",
      diagnostico: "Receta para tratamiento de piel.",
      tipo: "Recetas",
    },
    {
      fecha: "2025-06-20",
      especialista: "Dra. Carolina Soto (Laboratorio)",
      diagnostico: "Examen de sangre: todo normal.",
      tipo: "Exámenes",
    },
  ];

  // Normalizar texto
  const normalizeKey = (str) =>
    str
      ? str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .replace(/s$/, "")
      : "";

  // Filtrar historial
  const historialFiltrado = historial.filter((item) => {
    const coincideFecha = !filtroFecha || item.fecha === filtroFecha;
    const coincideTipo =
      !filtroTipo || normalizeKey(item.tipo) === normalizeKey(filtroTipo);
    return coincideFecha && coincideTipo;
  });

  // Navegación con React Router
  const handleNav = (path) => navigate(path);

  // Cerrar sesión
  const handleCerrarSesion = () => {
    sessionStorage.clear();
    navigate("/inicio");
  };

  const handleDescargar = () => {
    alert("📄 Descargando documento...");
  };

  return (
    <div className="bg-light min-vh-100">
      {/* 🔹 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <div className="ms-auto">
          <button
            className="btn btn-outline-light fw-bold"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-primary sidebar collapse min-vh-100 text-white text-center pt-3">
            <div className="py-3 border-bottom">
              <img
                src="https://i.imgur.com/100lvlZ.png"
                alt="MedicTime Logo"
                className="img-fluid"
                style={{ maxWidth: "120px" }}
              />
            </div>
            <ul className="nav flex-column mt-3">
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn w-100 text-start ${
                    location.pathname === "/dashboard" ? "fw-bold" : ""
                  }`}
                  onClick={() => handleNav("/dashboard")}
                >
                  <i className="bi bi-house-door me-2"></i>Inicio
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn w-100 text-start ${
                    location.pathname === "/citas" ? "fw-bold" : ""
                  }`}
                  onClick={() => handleNav("/citas")}
                >
                  <i className="bi bi-calendar-plus me-2"></i>Citas
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn w-100 text-start ${
                    location.pathname === "/historial" ? "fw-bold" : ""
                  }`}
                  onClick={() => handleNav("/historial")}
                >
                  <i className="bi bi-clock-history me-2"></i>Historial
                </button>
              </li>
            </ul>
          </nav>

          {/* 🔹 Contenido principal */}
          <main className="col-md-9 col-lg-10 p-4">
            <div className="card shadow-lg border-0">
              <div className="card-body bg-primary text-white rounded">
                <h4 className="fw-bold mb-3">Historial Médico</h4>

                {/* Filtros */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="filtro-fecha" className="form-label fw-bold">
                      Filtrar por fecha
                    </label>
                    <input
                      type="date"
                      id="filtro-fecha"
                      className="form-control"
                      value={filtroFecha}
                      onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="filtro-tipo" className="form-label fw-bold">
                      Filtrar por tipo
                    </label>
                    <select
                      id="filtro-tipo"
                      className="form-select"
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="informes">Informes</option>
                      <option value="recetas">Recetas</option>
                      <option value="examenes">Exámenes</option>
                    </select>
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button className="btn btn-light fw-bold w-100">
                      <i className="bi bi-funnel"></i> Aplicar filtro
                    </button>
                  </div>
                </div>

                {/* Tabla */}
                <div className="table-responsive">
                  <table className="table table-striped table-hover bg-white text-dark rounded shadow-sm">
                    <thead className="table-primary">
                      <tr>
                        <th>Fecha</th>
                        <th>Especialista</th>
                        <th>Diagnóstico</th>
                        <th>Documento</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historialFiltrado.length > 0 ? (
                        historialFiltrado.map((item, index) => (
                          <tr key={index}>
                            <td>{item.fecha}</td>
                            <td>{item.especialista}</td>
                            <td>{item.diagnostico}</td>
                            <td>{item.tipo}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={handleDescargar}
                              >
                                <i className="bi bi-file-earmark-arrow-down"></i> Descargar PDF
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-3">
                            No se encontraron resultados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HistorialMedico;
