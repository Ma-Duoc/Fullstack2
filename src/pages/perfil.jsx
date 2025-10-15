import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Perfil() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    nuevaPassword: "",
    confirmPassword: "",
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = "Por favor ingresa tu nombre.";
    if (!/\S+@\S+\.\S+/.test(form.correo)) nuevosErrores.correo = "Ingresa un correo válido.";
    if (!/^\+?[\d\s-]{9,15}$/.test(form.telefono))
      nuevosErrores.telefono = "Ingresa un número de teléfono válido.";
    if (!form.direccion.trim()) nuevosErrores.direccion = "La dirección es obligatoria.";

    if (form.nuevaPassword && form.nuevaPassword.length < 6)
      nuevosErrores.nuevaPassword = "La contraseña debe tener al menos 6 caracteres.";
    if (form.nuevaPassword !== form.confirmPassword)
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    alert("Cambios guardados con éxito");
    console.log("Datos guardados:", form);
    setForm({
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
      nuevaPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center position-relative">
      {/* Fondo */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/foto-gratis/doctor-sosteniendo-carpeta-azul-estetoscopio_1150-18914.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          opacity: 0.3,
        }}
      ></div>

      {/* Contenedor */}
      <div className="card shadow w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h4 className="text-center text-primary mb-4">Perfil de Usuario</h4>

          <form onSubmit={handleSubmit} noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
                  id="nombre"
                  placeholder="Juan Pérez"
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                  id="correo"
                  placeholder="correo@ejemplo.com"
                  value={form.correo}
                  onChange={handleChange}
                />
                {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                  id="telefono"
                  placeholder="+56 9 1234 5678"
                  value={form.telefono}
                  onChange={handleChange}
                />
                {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="direccion" className="form-label">
                  Dirección
                </label>
                <input
                  type="text"
                  className={`form-control ${errores.direccion ? "is-invalid" : ""}`}
                  id="direccion"
                  placeholder="Av. Siempre Viva 742"
                  value={form.direccion}
                  onChange={handleChange}
                />
                {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
              </div>
            </div>

            <h6 className="text-primary mt-4">Cambiar Contraseña</h6>
            <div className="mb-3">
              <label htmlFor="nuevaPassword" className="form-label">
                Nueva contraseña
              </label>
              <input
                type="password"
                className={`form-control ${errores.nuevaPassword ? "is-invalid" : ""}`}
                id="nuevaPassword"
                placeholder="********"
                value={form.nuevaPassword}
                onChange={handleChange}
              />
              {errores.nuevaPassword && (
                <div className="invalid-feedback">{errores.nuevaPassword}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className={`form-control ${errores.confirmPassword ? "is-invalid" : ""}`}
                id="confirmPassword"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errores.confirmPassword && (
                <div className="invalid-feedback">{errores.confirmPassword}</div>
              )}
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
