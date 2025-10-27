import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Citas() {
  const navigate = useNavigate();
  const location = useLocation();

  const [citas, setCitas] = useState(() => JSON.parse(sessionStorage.getItem("citas")) || []);
  const [nuevaCita, setNuevaCita] = useState({ fecha: "", hora: "", especialista: "", direccion: "", estado: "Pendiente" });

  useEffect(() => { sessionStorage.setItem("citas", JSON.stringify(citas)); }, [citas]);

  const handleChange = (e) => setNuevaCita({ ...nuevaCita, [e.target.id]: e.target.value });

  const agregarCita = (e) => {
    e.preventDefault();
    if (Object.values(nuevaCita).some(v => !v)) return alert("⚠️ Por favor, completa todos los campos.");
    setCitas([...citas, nuevaCita]);
    setNuevaCita({ fecha: "", hora: "", especialista: "", direccion: "", estado: "Pendiente" });
    alert("Nueva cita registrada");
  };

  const eliminarCita = (index) => setCitas(citas.filter((_, i) => i !== index));

  const cerrarSesion = () => { sessionStorage.clear(); navigate("/inicio"); };

  const sidebarItems = [
    { path: "/dashboard", icon: "house-door", label: "Inicio" },
    { path: "/citas", icon: "calendar-plus", label: "Citas" },
    { path: "/historial", icon: "clock-history", label: "Historial" },
  ];

  const especialistas = ["Médico General","Cardiólogo","Dermatólogo","Pediatra"];
  const direcciones = [
    "Centro Médico Principal - Av. Siempre Viva 123",
    "Sucursal Norte - Calle Los Álamos 456",
    "Sucursal Sur - Av. Las Flores 789"
  ];

  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-primary px-3">
        <div className="ms-auto">
          <button className="btn btn-outline-light fw-bold" onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">

          <nav className="col-md-3 col-lg-2 d-md-block bg-primary text-white sidebar min-vh-100 p-3">
            <div className="text-center border-bottom pb-3 mb-3">
              <img src="https://i.imgur.com/100lvlZ.png" alt="MedicTime Logo" style={{ maxWidth: "120px" }} />
            </div>
            <ul className="nav flex-column">
              {sidebarItems.map(item => (
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
            <h3 className="fw-bold mb-4">Gestión de Citas</h3>

            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white"><i className="bi bi-list-check"></i> Mis Citas</div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Fecha</th><th>Hora</th><th>Especialista</th><th>Dirección</th><th>Estado</th><th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.length === 0 ? (
                      <tr><td colSpan="6" className="text-center text-muted py-3">No hay citas registradas.</td></tr>
                    ) : (
                      citas.map((cita, i) => (
                        <tr key={i}>
                          <td>{cita.fecha}</td><td>{cita.hora}</td><td>{cita.especialista}</td><td>{cita.direccion}</td>
                          <td><span className="badge bg-success">{cita.estado}</span></td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => eliminarCita(i)}>
                              <i className="bi bi-trash"></i> Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white"><i className="bi bi-calendar-plus"></i> Agendar Nueva Cita</div>
              <div className="card-body">
                <form className="row g-3" onSubmit={agregarCita}>
                  {["fecha","hora"].map(field => (
                    <div className="col-md-4" key={field}>
                      <label htmlFor={field} className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <input type={field==="fecha"?"date":"time"} className="form-control" id={field} value={nuevaCita[field]} onChange={handleChange} required />
                    </div>
                  ))}

                  <div className="col-md-4">
                    <label htmlFor="especialista" className="form-label">Especialista</label>
                    <select id="especialista" className="form-select" value={nuevaCita.especialista} onChange={handleChange} required>
                      <option value="">Seleccione...</option>
                      {especialistas.map(e => <option key={e}>{e}</option>)}
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <select id="direccion" className="form-select" value={nuevaCita.direccion} onChange={handleChange} required>
                      <option value="">Seleccione...</option>
                      {direcciones.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>

                  <div className="col-12"><button type="submit" className="btn btn-primary">Agregar Cita</button></div>
                </form>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}



