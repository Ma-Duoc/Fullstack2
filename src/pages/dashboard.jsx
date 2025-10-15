import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rut: "",
  });

  useEffect(() => {
    const datosGuardados = {
      nombre: sessionStorage.getItem("nombre") || "Cristian Pizarro Bahamondes",
      email: sessionStorage.getItem("email") || "cristianbahamondes66@gmail.com",
      telefono: sessionStorage.getItem("telefono") || "+56 9 1234 5678",
      rut: sessionStorage.getItem("rut") || "12.345.678-9",
    };
    setPerfil(datosGuardados);
  }, []);

  const guardarCambios = (e) => {
    e.preventDefault();
    Object.entries(perfil).forEach(([k, v]) => sessionStorage.setItem(k, v));
    setEditando(false);
  };

  const cerrarSesion = () => {
    sessionStorage.clear();
    navigate("/inicio");
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <div className="ms-auto">
          <button onClick={cerrarSesion} className="btn btn-outline-light fw-bold">
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
            <div className="card shadow-lg border-0">
              <div className="card-body bg-primary text-white rounded">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h4 className="fw-bold">Perfil MedicTime</h4>
                    <p className="mb-1">{perfil.nombre}</p>
                  </div>
                  <button className="btn btn-light btn-sm">
                    <i className="bi bi-camera"></i> Subir foto
                  </button>
                </div>

                <div className="mb-3">
                  <p className="mb-1 fw-bold">RUT</p>
                  <p className="mb-0">{perfil.rut}</p>
                </div>

                <hr className="border-light" />

                {!editando ? (
                  <div>
                    <div className="mb-3">
                      <p className="mb-1 fw-bold">Email</p>
                      <p className="mb-0">{perfil.email}</p>
                    </div>
                    <div className="mb-3">
                      <p className="mb-1 fw-bold">Teléfono</p>
                      <p className="mb-0">{perfil.telefono}</p>
                    </div>
                    <button
                      className="btn btn-light fw-bold"
                      onClick={() => setEditando(true)}
                    >
                      Editar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={guardarCambios}>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-white">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        value={perfil.nombre}
                        onChange={(e) =>
                          setPerfil({ ...perfil, nombre: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-white">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={perfil.email}
                        onChange={(e) =>
                          setPerfil({ ...perfil, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-white">Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        value={perfil.telefono}
                        onChange={(e) =>
                          setPerfil({ ...perfil, telefono: e.target.value })
                        }
                      />
                    </div>
                    <button type="submit" className="btn btn-light fw-bold">
                      Guardar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary fw-bold ms-2"
                      onClick={() => setEditando(false)}
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


