import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/estilos.css";

export default function Inicio() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({ nombre: "", email: "", mensaje: "" });
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => setContact({ ...contact, [e.target.id]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", contact);
    setSuccessMsg("¡Mensaje enviado con éxito!");
    setContact({ nombre: "", email: "", mensaje: "" });
  };

  const navItems = [
    { label: "Preguntas Frecuentes", path: "/preguntas" },
    { label: "Contacto", modal: "#contactModal" },
    { label: "Quiénes somos", modal: "#quienesSomosModal" },
  ];

  const noticias = [
    {
      img: "https://img.freepik.com/foto-gratis/doctores-reunion-hospital_23-2148980718.jpg",
      title: "Nueva Unidad de Urgencias",
      text: "Tecnología avanzada para atención inmediata.",
    },
    {
      img: "https://www.ssvq.cl/hospitales/site/artic/20200317/imag/foto_0000000420200317094056.jpg",
      title: "Campaña de vacunación",
      text: "Campaña gratuita para toda la comunidad.",
    },
    {
      img: "https://d328k6xhl3lmif.cloudfront.net/images/default-source/default-album/equipos-medicos-036926be07427d4ffaa410f529b328d449.jpg?sfvrsn=de5bf1b4_0",
      title: "Nuevo equipo médico",
      text: "Nuevos especialistas en cardiología y pediatría.",
    },
  ];

  const servicios = ["EXÁMENES", "CIRUGÍAS", "CONVENIOS", "HORARIOS"];

  return (
    <>
      <header className="bg-white shadow-sm w-100">
        <nav className="navbar navbar-expand-lg navbar-light container-fluid">
          <button className="navbar-brand btn border-0 bg-transparent p-0" onClick={() => navigate("/inicio")}>
            <img src="https://i.imgur.com/100lvlZ.png" alt="MEDICTIME Logo" className="navbar-logo" />
          </button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuNav">
            <ul className="navbar-nav ms-auto me-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    className="nav-link btn border-0 bg-transparent"
                    onClick={() => item.path && navigate(item.path)}
                    data-bs-toggle={item.modal ? "modal" : undefined}
                    data-bs-target={item.modal || undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <button className="btn btn-outline-primary" onClick={() => navigate("/registro")}>
              Registrarse
            </button>
          </div>
        </nav>
      </header>

      <div className="bg-dark w-100">
        <ul className="nav justify-content-center py-1 container-fluid">
          {servicios.map((s) => (
            <li key={s}>
              <span className="nav-link text-white fw-bold">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <section className="hero text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <h1>BIENVENIDO</h1>
        <p className="lead">Ingresa aquí para acceder a tus servicios médicos</p>
        <button className="btn btn-lg mt-3 boton-claveunica btn-primary" onClick={() => navigate("/login")}>
          Ingresar con Clave Única
        </button>
      </section>

      <section className="container-fluid my-5">
        <h2 className="text-center mb-4">Noticias de la Clínica</h2>
        <div className="row g-4 justify-content-center">
          {noticias.map((n, i) => (
            <div className="col-md-4" key={i}>
              <div className="card shadow-sm h-100">
                <img src={n.img} className="card-img-top" alt={n.title} />
                <div className="card-body">
                  <h5 className="card-title">{n.title}</h5>
                  <p className="card-text">{n.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-4 w-100">
        <p className="mb-2">&copy; 2025 MEDICTIME | Mejorando la salud de Chile desde 1972</p>
        <small>📧 contacto@medictime.cl | ☎ +56 2 2345 6789</small>
      </footer>

      {/* Modal Contacto */}
      <div className="modal fade" id="contactModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contacto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {["nombre", "email"].map((f) => (
                  <div className="mb-3" key={f}>
                    <label htmlFor={f} className="form-label">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                    <input
                      type={f === "email" ? "email" : "text"}
                      className="form-control"
                      id={f}
                      value={contact[f]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Mensaje</label>
                  <textarea className="form-control" id="mensaje" rows="3" value={contact.mensaje} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar</button>
                {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Quiénes Somos */}
      <div className="modal fade" id="quienesSomosModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Quiénes Somos</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <p>
                La Clínica <strong>MEDICTIME</strong> fue fundada en 1972 con la misión de brindar atención médica de calidad. Con más de 50 años de experiencia, seguimos comprometidos con la salud y el bienestar de nuestros pacientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

