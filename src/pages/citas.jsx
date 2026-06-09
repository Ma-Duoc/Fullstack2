import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Citas() {
  const navigate = useNavigate();
  const location = useLocation();

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nuevaCita, setNuevaCita] = useState({ 
    fecha: "", 
    hora: "", 
    medicoId: "", 
    salaId: "", 
    motivo: "" 
  });

  const handleChange = (e) => setNuevaCita({ ...nuevaCita, [e.target.id]: e.target.value });

  const agregarCita = async (e) => {
    e.preventDefault();
    
    if (Object.values(nuevaCita).some(v => !v)) {
      return alert("⚠️ Por favor, completa todos los campos.");
    }

    const rut = sessionStorage.getItem("rut");
    const nombre = sessionStorage.getItem("nombre");
    const apellido = sessionStorage.getItem("apellido");

    if (!rut || !nombre) {
      return alert("⚠️ No hay sesión de paciente activa.");
    }

    setLoading(true);
    
    try {
      // Combinar fecha y hora en formato LocalDateTime
      const fechaHora = `${nuevaCita.fecha}T${nuevaCita.hora}:00`;
      
      // Validar que la fecha sea futura
      const fechaSeleccionada = new Date(fechaHora);
      const ahora = new Date();
      if (fechaSeleccionada <= ahora) {
        setLoading(false);
        return alert("⚠️ La fecha y hora deben ser futuras.");
      }
      
      // Obtener datos del médico seleccionado
      const medicoSeleccionado = medicos.find(m => m.id === parseInt(nuevaCita.medicoId));
      const salaSeleccionada = salas.find(s => s.id === parseInt(nuevaCita.salaId));

      const citaRequest = {
        userId: rut,
        userNombre: `${nombre} ${apellido || ""}`,
        medicoId: nuevaCita.medicoId,
        medicoNombre: medicoSeleccionado ? `${medicoSeleccionado.nombre} ${medicoSeleccionado.apellido}` : "",
        especialidad: medicoSeleccionado ? medicoSeleccionado.especialidad : "",
        salaId: parseInt(nuevaCita.salaId),
        salaNombre: salaSeleccionada ? salaSeleccionada.nombre : "",
        fechaHora: fechaHora,
        motivo: nuevaCita.motivo
      };

      const response = await fetch("http://localhost:8089/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(citaRequest)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || error.error || "Error al agendar cita");
      }

      const citaCreada = await response.json();
      setCitas([...citas, citaCreada]);
      setNuevaCita({ fecha: "", hora: "", medicoId: "", salaId: "", motivo: "" });
      alert("✅ Cita agendada exitosamente");
      
    } catch (error) {
      console.error("Error al agendar cita:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const cerrarSesion = () => { sessionStorage.clear(); navigate("/inicio"); };

  const sidebarItems = [
    { path: "/dashboard", icon: "house-door", label: "Inicio" },
    { path: "/citas", icon: "calendar-plus", label: "Citas" },
    { path: "/historial", icon: "clock-history", label: "Historial" },
  ];

  const [medicos, setMedicos] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    // Cargar médicos
    fetch("http://localhost:8089/api/medicos")
      .then(res => res.json())
      .then(data => setMedicos(data))
      .catch(err => console.error("Error al cargar médicos:", err));

    // Cargar salas
    fetch("http://localhost:8089/api/salas")
      .then(res => res.json())
      .then(data => setSalas(data))
      .catch(err => console.error("Error al cargar salas:", err));

    // Cargar citas del paciente
    const rut = sessionStorage.getItem("rut");
    if (rut) {
      fetch(`http://localhost:8089/api/citas/usuario/${rut}`)
        .then(res => res.json())
        .then(data => setCitas(data))
        .catch(err => console.error("Error al cargar citas:", err));
    }
  }, []);

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
                      <th>Fecha</th><th>Hora</th><th>Médico</th><th>Especialidad</th><th>Sala</th><th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.length === 0 ? (
                      <tr><td colSpan="6" className="text-center text-muted py-3">No hay citas registradas.</td></tr>
                    ) : (
                      citas.map((cita, i) => (
                        <tr key={cita.id || i}>
                          <td>{new Date(cita.fechaHora).toLocaleDateString()}</td>
                          <td>{new Date(cita.fechaHora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                          <td>{cita.medicoNombre}</td>
                          <td>{cita.especialidad}</td>
                          <td>{cita.salaNombre}</td>
                          <td><span className="badge bg-success">{cita.estado || "PROGRAMADA"}</span></td>
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

                  <div className="col-md-6">
                    <label htmlFor="medicoId" className="form-label">Médico</label>
                    <select id="medicoId" className="form-select" value={nuevaCita.medicoId} onChange={handleChange} required>
                      <option value="">Seleccione...</option>
                      {medicos.map(m => (
                        <option key={m.id} value={m.id}>{m.nombre} {m.apellido} - {m.especialidad}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="salaId" className="form-label">Sala</label>
                    <select id="salaId" className="form-select" value={nuevaCita.salaId} onChange={handleChange} required>
                      <option value="">Seleccione...</option>
                      {salas.map(s => (
                        <option key={s.id} value={s.id}>{s.nombre} - {s.tipo}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="motivo" className="form-label">Motivo de la cita</label>
                    <textarea 
                      id="motivo" 
                      className="form-control" 
                      value={nuevaCita.motivo} 
                      onChange={handleChange} 
                      required
                      rows="3"
                      placeholder="Describe el motivo de tu consulta..."
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Agendando..." : "Agendar Cita"}
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



