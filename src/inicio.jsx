import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- para navegación
import "./estilos.css";

export default function Inicio() {
  const navigate = useNavigate(); // hook para navegar
  const [contactForm, setContactForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Mensaje enviado con éxito!");
    setContactForm({ nombre: "", email: "", mensaje: "" });
  };

  // Función para ir a la otra página
  const irAOtraPagina = () => {
    navigate("/otra");
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-light container align-items-center">
          <a className="navbar-brand" href="#">
            <img
              src="https://i.imgur.com/100lvlZ.png"
              alt="MEDICTIME Logo"
              className="navbar-logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menuNav">
            <ul className="navbar-nav ms-auto me-3">
              <li>
                <button
                  onClick={irAOtraPagina} // <-- navegación a /otra
                  className="nav-link btn btn-link p-0"
                >
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#contactModal"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#quienesSomosModal"
                >
                  Quiénes somos
                </a>
              </li>
            </ul>
            <a href="#" className="btn btn-outline-primary">
              Registrarse
            </a>
          </div>
        </nav>
      </header>

      {/* NAVBAR SECUNDARIO */}
      <div className="bg-dark">
        <nav className="container">
          <ul className="nav justify-content-center py-1">
            <li>
              <a className="nav-link text-white fw-bold" href="#">
                EXÁMENES
              </a>
            </li>
            <li>
              <a className="nav-link text-white fw-bold" href="#">
                CIRUGÍAS
              </a>
            </li>
            <li>
              <a className="nav-link text-white fw-bold" href="#">
                CONVENIOS
              </a>
            </li>
            <li>
              <a className="nav-link text-white fw-bold" href="#">
                HORARIOS
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* HERO */}
      <section className="hero text-center">
        <h1>BIENVENIDO</h1>
        <p className="lead">Ingresa aquí para acceder a tus servicios médicos</p>
        <button
          onClick={() => alert("Aquí podrías implementar otra acción")}
          className="btn btn-lg mt-3 boton-claveunica"
        >
          Clave Única
        </button>
      </section>

      {/* NOTICIAS */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Noticias de la Clínica</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img
                src="https://img.freepik.com/foto-gratis/doctores-reunion-hospital_23-2148980718.jpg"
                className="card-img-top"
                alt="Noticia 1"
              />
              <div className="card-body">
                <h5 className="card-title">Nueva Unidad de Urgencias</h5>
                <p className="card-text">
                  Tecnología avanzada para atención inmediata.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <img
                src="https://www.ssvq.cl/hospitales/site/artic/20200317/imag/foto_0000000420200317094056.jpg"
                className="card-img-top"
                alt="Noticia 2"
              />
              <div className="card-body">
                <h5 className="card-title">Campaña de vacunación</h5>
                <p className="card-text">
                  Campaña gratuita para toda la comunidad.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <img
                src="https://d328k6xhl3lmif.cloudfront.net/images/default-source/default-album/equipos-medicos-036926be07427d4ffaa410f529b328d449.jpg?sfvrsn=de5bf1b4_0"
                className="card-img-top"
                alt="Noticia 3"
              />
              <div className="card-body">
                <h5 className="card-title">Nuevo equipo médico</h5>
                <p className="card-text">
                  Nuevos especialistas en cardiología y pediatría.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-2">
          &copy; 2025 MEDICTIME | Mejorando la salud de Chile desde 1972
        </p>
        <small>📧 contacto@medictime.cl | ☎ +56 2 2345 6789</small>
      </footer>

      {/* MODAL CONTACTO */}
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="contactModalLabel">
                Contacto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={contactForm.nombre}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, nombre: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    rows="3"
                    value={contactForm.mensaje}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, mensaje: e.target.value })
                    }
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL QUIÉNES SOMOS */}
      <div
        className="modal fade"
        id="quienesSomosModal"
        tabIndex="-1"
        aria-labelledby="quienesSomosModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="quienesSomosModalLabel">
                Quiénes Somos
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                La Clínica <strong>MEDICTIME</strong> fue fundada en 1972 con la
                misión de brindar atención médica de calidad. Con más de 50 años
                de experiencia, seguimos comprometidos con la salud y el
                bienestar de nuestros pacientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
