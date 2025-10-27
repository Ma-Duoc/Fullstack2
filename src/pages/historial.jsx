import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const historial = [
  { fecha: "2025-08-15", especialista: "Dra. Fernanda Muñoz (Cardióloga)", diagnostico: "Chequeo general, sin hallazgos graves.", tipo: "Informes" },
  { fecha: "2025-07-30", especialista: "Dr. Luis Pérez (Dermatólogo)", diagnostico: "Receta para tratamiento de piel.", tipo: "Recetas" },
  { fecha: "2025-06-20", especialista: "Dra. Carolina Soto (Laboratorio)", diagnostico: "Examen de sangre: todo normal.", tipo: "Exámenes" },
];

export default function HistorialMedico() {
  const navigate = useNavigate();
  const location = useLocation();
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const normalize = (str) => str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/s$/, "");

  const historialFiltrado = historial.filter(item =>
    (!filtroFecha || item.fecha === filtroFecha) &&
    (!filtroTipo || normalize(item.tipo) === normalize(filtroTipo))
  );

  const navItems = [
    { path: "/dashboard", icon: "house-door", label: "Inicio" },
    { path: "/citas", icon: "calendar-plus", label: "Citas" },
    { path: "/historial", icon: "clock-history", label: "Historial" },
  ];

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <div className="ms-auto">
          <button className="btn btn-outline-light fw-bold" onClick={() => { sessionStorage.clear(); navigate("/inicio"); }}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-3 col-lg-2 d-md-block bg-primary sidebar collapse min-vh-100 text-white text-center pt-3">
            <div className="py-3 border-bottom">
              <img src="https://i.imgur.com/100lvlZ.png" alt="MedicTime Logo" className="img-fluid" style={{ maxWidth: "120px" }} />
            </div>
            <ul className="nav flex-column mt-3">
              {navItems.map(item => (
                <li key={item.path} className="nav-item">
                  <button
                    className={`nav-link text-white btn w-100 text-start ${location.pathname === item.path ? "fw-bold" : ""}`}
                    onClick={() => navigate(item.path)}
                  >
                    <i className={`bi bi-${item.icon} me-2`}></i>{item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main className="col-md-9 col-lg-10 p-4">
            <div className="card shadow-lg border-0">
              <div className="card-body bg-primary text-white rounded">
                <h4 className="fw-bold mb-3">Historial Médico</h4>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Filtrar por fecha</label>
                    <input type="date" className="form-control" value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Filtrar por tipo</label>
                    <select className="form-select" value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
                      <option value="">Todos</option>
                      <option value="informes">Informes</option>
                      <option value="recetas">Recetas</option>
                      <option value="examenes">Exámenes</option>
                    </select>
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button className="btn btn-light fw-bold w-100"><i className="bi bi-funnel"></i> Aplicar filtro</button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover bg-white text-dark rounded shadow-sm">
                    <thead className="table-primary">
                      <tr>
                        {["Fecha", "Especialista", "Diagnóstico", "Documento", "Acciones"].map(h => <th key={h}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {historialFiltrado.length ? (
                        historialFiltrado.map((item, i) => (
                          <tr key={i}>
                            <td>{item.fecha}</td>
                            <td>{item.especialista}</td>
                            <td>{item.diagnostico}</td>
                            <td>{item.tipo}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary" onClick={() => alert("📄 Descargando documento...")}>
                                <i className="bi bi-file-earmark-arrow-down"></i> Descargar PDF
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="5" className="text-center py-3">No se encontraron resultados.</td></tr>
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
}
