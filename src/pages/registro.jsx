import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    if (!isEmail(email.trim()))
      newErrors.email = "Por favor, ingresa un correo válido.";
    if (!validarRut(rut.trim()))
      newErrors.rut = "Ingrese un RUT válido (ej: 12345678-9).";
    if (!isStrongPassword(password))
      newErrors.password =
        "Mínimo 8 caracteres, con mayúscula, minúscula y número.";
    if (confirmPassword !== password || !confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem(
        "usuario",
        JSON.stringify({ nombre, email, rut: normalizarRut(rut), password })
      );
      setSuccess(true);

      setNombre("");
      setEmail("");
      setRut("");
      setPassword("");
      setConfirmPassword("");

      if (import.meta.env.MODE === "test") {
        navigate("/inicio"); 
      } else {
        setTimeout(() => navigate("/inicio"), 1500); 
      }
    }
  };

  return (
    <div className="registro-section">
      {success && (
        <div className="registro-success">✅ Registro exitoso</div>
      )}

      <div className="card">
        <div className="card-body">
          <h4>Registro</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                className={`form-control ${errors.nombre ? "is-invalid" : nombre ? "is-valid" : ""}`}
                placeholder="Ej: Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : email ? "is-valid" : ""}`}
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="rut">RUT</label>
              <input
                type="text"
                id="rut"
                className={`form-control ${errors.rut ? "is-invalid" : rut ? "is-valid" : ""}`}
                placeholder="Ej: 12345678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
              />
              {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`}
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : confirmPassword ? "is-valid" : ""}`}
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn-registro">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;

