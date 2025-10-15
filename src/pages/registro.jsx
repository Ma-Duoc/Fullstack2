import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Registro = () => {
  const navigate = useNavigate(); 
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isStrongPassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
  const normalizarRut = (r) => r.replace(/\./g, "").toUpperCase();
  const validarRut = (rut) => {
    rut = normalizarRut(rut);
    if (!/^[0-9]+-[0-9K]$/.test(rut)) return false;
    const [num, dv] = rut.split("-");
    if (num.length < 7 || num.length > 9) return false;

    let suma = 0,
      mul = 2;
    for (let i = num.length - 1; i >= 0; i--) {
      suma += parseInt(num[i], 10) * mul;
      mul = mul < 7 ? mul + 1 : 2;
    }
    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();
    return dv === dvEsperado;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!isEmail(email.trim())) newErrors.email = "Por favor, ingresa un correo válido.";
    if (!validarRut(rut.trim())) newErrors.rut = "Ingrese un RUT válido (ej: 12345678-9).";
    if (!isStrongPassword(password))
      newErrors.password = "Mínimo 8 caracteres, con mayúscula, minúscula y número.";
    if (confirmPassword !== password || !confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem(
        "usuario",
        JSON.stringify({ nombre, email, rut: normalizarRut(rut), password })
      );
      setSuccess(true);

      // Limpiar campos
      setNombre("");
      setEmail("");
      setRut("");
      setPassword("");
      setConfirmPassword("");

      // Mostrar notificación 1.5s antes de redirigir
      setTimeout(() => navigate("/inicio"), 1500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('https://i.imgur.com/100lvlZ.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Overlay oscuro */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 0,
        }}
      />

      {/* Notificación */}
      {success && (
        <div
          className="card bg-success text-white text-center position-fixed top-0 start-50 translate-middle-x shadow-sm"
          style={{ zIndex: 1050, maxWidth: "400px" }}
        >
          <div className="card-body p-2">✅ Registro exitoso</div>
        </div>
      )}

      {/* Formulario */}
      <div
        className="card text-dark shadow w-100"
        style={{ maxWidth: "500px", zIndex: 1, position: "relative" }}
      >
        <div className="card-body">
          <h4 className="text-center text-primary mb-4">Registro</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre Completo
              </label>
              <input
                type="text"
                id="nombre"
                className={`form-control ${
                  errors.nombre ? "is-invalid" : nombre ? "is-valid" : ""
                }`}
                placeholder="Ej: Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              {errors.nombre && (
                <div className="invalid-feedback">{errors.nombre}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${
                  errors.email ? "is-invalid" : email ? "is-valid" : ""
                }`}
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="rut" className="form-label">
                RUT
              </label>
              <input
                type="text"
                id="rut"
                className={`form-control ${
                  errors.rut ? "is-invalid" : rut ? "is-valid" : ""
                }`}
                placeholder="Ej: 12345678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
              />
              {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : password ? "is-valid" : ""
                }`}
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : confirmPassword ? "is-valid" : ""
                }`}
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;

