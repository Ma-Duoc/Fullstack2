import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Citas() {
  const navigate = useNavigate();
  const location = useLocation();

  // Inicializamos las citas directamente desde sessionStorage
  const [citas, setCitas] = useState(() => {
    return JSON.parse(sessionStorage.getItem("citas")) || [];
  });

  const [nuevaCita, setNuevaCita] = useState({
    fecha: "",
    hora: "",
    especialista: "",
    direccion: "",
    estado: "Pendiente",
  });

  // Cada vez que cambian las citas, las guardamos en sessionStorage
  useEffect(() => {
    sessionStorage.setItem("citas", JSON.stringify(citas));
  }, [citas]);

  const handleChange = (e) => {
    setNuevaCita({ ...nuevaCita, [e.target.id]: e.target.value });
  };

  const agregarCita = (e) => {
    e.preventDefault();
    const { fecha, hora, especialista, direccion } = nuevaCita;
    if (!fecha || !hora || !especialista || !direccion) {
      alert("⚠️ Por favor, completa todos los campos.");
      return;
    }
    setCitas([...citas, nuevaCita]);
    setNuevaCita({
      fecha: "",
      hora: "",
      especialista: "",
      direccion: "",
      estado: "Pendiente",
    });
    alert("Nueva cita registrada");
  };

  const eliminarCita = (index) => {
    const nuevas = citas.filter((_, i) => i !== index);
    setCitas(nuevas);
  };

  const cerrarSesion = () => {
    sessionStorage.clear();
    navigate("/inicio");
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-3">
        <div className="ms-auto">
          <button onClick={cerrarSesion} className="btn btn-outline-light fw-bold">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-primary text-white sidebar min-vh-100 p-3">
            <div className="text-center border-bottom pb-3 mb-3">
              <img
                src="https://i.imgur.com/100lvlZ.png"
                alt="MedicTime Logo"
                style={{ maxWidth: "120px" }}
              />
            </div>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn w-100 text-start ${
                    location.pathname === "/dashboard" ? "fw-bold" : ""
                  }`}
                  onClick={() => navigate("/dashboard")}
                >
                  <i className="bi bi-house-door me-2"></i>Inicio
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn w-100 text-start ${
                    location.pathname === "/citas" ? "fw-bold" : ""
                  }`}
                  onClick={() => navigate("/citas")}
                >
                  <i className="bi bi-calendar-plus me-2"></i>Citas
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link text-white btn w-100 text-start ${
                    location.pathname === "/historial" ? "fw-bold" : ""
                  }`}
                  onClick={() => navigate("/historial")}
                >
                  <i className="bi bi-clock-history me-2"></i>Historial
                </button>
              </li>
            </ul>
          </nav>

          {/* Contenido principal */}
          <main className="col-md-9 col-lg-10 p-4">
            <h3 className="fw-bold mb-4">Gestión de Citas</h3>

            {/* Lista de citas */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <i className="bi bi-list-check"></i> Mis Citas
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Especialista</th>
                      <th>Dirección</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-3">
                          No hay citas registradas.
                        </td>
                      </tr>
                    ) : (
                      citas.map((cita, index) => (
                        <tr key={index}>
                          <td>{cita.fecha}</td>
                          <td>{cita.hora}</td>
                          <td>{cita.especialista}</td>
                          <td>{cita.direccion}</td>
                          <td>
                            <span className="badge bg-success">{cita.estado}</span>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminarCita(index)}
                            >
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

            {/* Formulario nueva cita */}
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <i className="bi bi-calendar-plus"></i> Agendar Nueva Cita
              </div>
              <div className="card-body">
                <form className="row g-3" onSubmit={agregarCita}>
                  <div className="col-md-4">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fecha"
                      value={nuevaCita.fecha}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="hora" className="form-label">Hora</label>
                    <input
                      type="time"
                      className="form-control"
                      id="hora"
                      value={nuevaCita.hora}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="especialista" className="form-label">Especialista</label>
                    <select
                      className="form-select"
                      id="especialista"
                      value={nuevaCita.especialista}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione...</option>
                      <option>Médico General</option>
                      <option>Cardiólogo</option>
                      <option>Dermatólogo</option>
                      <option>Pediatra</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <select
                      className="form-select"
                      id="direccion"
                      value={nuevaCita.direccion}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione...</option>
                      <option>Centro Médico Principal - Av. Siempre Viva 123</option>
                      <option>Sucursal Norte - Calle Los Álamos 456</option>
                      <option>Sucursal Sur - Av. Las Flores 789</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Agregar Cita
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


