import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Examenes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [filtroEstado, setFiltroEstado] = useState("");
  const [examenes, setExamenes] = useState([]);

  useEffect(() => {
    const rut = sessionStorage.getItem("rut");
    if (rut) {
      fetch(`http://localhost:8089/api/historial/paciente/${rut}`)
        .then(res => res.json())
        .then(data => {
          const examenesMapeados = data.map(item => ({
            nombre: item.examen || "Sin nombre",
            estado: "Disponible",
            fecha: item.fechaCreacion ? item.fechaCreacion.split('T')[0] : ""
          }));
          setExamenes(examenesMapeados);
        })
        .catch(err => console.error("Error al cargar exámenes:", err));
    }
  }, []);

  const normalize = (str) => str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/s$/, "");

  const examenesFiltrados = examenes.filter(item =>
    !filtroEstado || normalize(item.estado) === normalize(filtroEstado)
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
                <h4 className="fw-bold mb-3">Exámenes</h4>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Filtrar por estado</label>
                    <select className="form-select" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
                      <option value="">Todos</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="completado">Completado</option>
                      <option value="disponible">Disponible</option>
                      <option value="en revision">En revisión</option>
                    </select>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover bg-white text-dark rounded shadow-sm">
                    <thead className="table-primary">
                      <tr>
                        {["Examen", "Estado", "Fecha", "Acciones"].map(h => <th key={h}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {examenesFiltrados.length ? (
                        examenesFiltrados.map((item, i) => (
                          <tr key={i}>
                            <td>{item.nombre}</td>
                            <td>
                              <span className={`badge ${
                                item.estado === "Completado" ? "bg-success" :
                                item.estado === "Pendiente" ? "bg-warning" :
                                item.estado === "Disponible" ? "bg-info" :
                                "bg-secondary"
                              }`}>
                                {item.estado}
                              </span>
                            </td>
                            <td>{item.fecha}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary" onClick={() => alert("📄 Descargando resultado...")}>
                                <i className="bi bi-file-earmark-arrow-down"></i> Descargar
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="text-center py-3">No se encontraron resultados.</td></tr>
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
