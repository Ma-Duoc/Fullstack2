import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isStrongPassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

  const normalizarRut = (r) => r.replace(/\./g, "").toUpperCase();

  const validarRut = (rut) => {
    rut = normalizarRut(rut);

    if (!/^[0-9]+-[0-9K]$/.test(rut)) return false;

    const [num, dv] = rut.split("-");

    if (num.length < 7 || num.length > 9) return false;

    let suma = 0;
    let mul = 2;

    for (let i = num.length - 1; i >= 0; i--) {
      suma += parseInt(num[i], 10) * mul;
      mul = mul < 7 ? mul + 1 : 2;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado =
      resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();

    return dv === dvEsperado;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio.";
    if (!fechaNacimiento)
      newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";

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
    setErrorMessage("");
    setSuccessMessage("");

    if (Object.keys(newErrors).length === 0) {
      try {
              const response = await fetch(
        "http://localhost:8089/api/pacientes/usuarios/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rut: normalizarRut(rut),
            nombre,
            apellido,
            fechaNacimiento,
            email,
            telefono,
            direccion,
            password,
          }),
        }
      );

      console.log("status:", response.status);

      const result = await response.json();
      console.log("response:", result);

        if (response.ok) {
          setSuccessMessage("Registro exitoso");

          setNombre("");
          setApellido("");
          setFechaNacimiento("");
          setEmail("");
          setRut("");
          setTelefono("");
          setDireccion("");
          setPassword("");
          setConfirmPassword("");

          setTimeout(() => navigate("/inicio"), 1500);
        } else {
          setErrorMessage(result);
        }
      } catch (error) {
        setErrorMessage("Error al conectar con el backend.");
      }
    }
  };

  return (
    <div className="registro-section">
      {successMessage && (
        <div className="registro-success">✅ {successMessage}</div>
      )}

      {errorMessage && (
        <div className="registro-error">❌ {errorMessage}</div>
      )}

      <div className="card">
        <div className="card-body">
          <h4>Registro</h4>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className={`form-control ${
                  errors.nombre ? "is-invalid" : ""
                }`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errors.nombre && (
                <div className="invalid-feedback">{errors.nombre}</div>
              )}
            </div>

            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                className={`form-control ${
                  errors.apellido ? "is-invalid" : ""
                }`}
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              {errors.apellido && (
                <div className="invalid-feedback">{errors.apellido}</div>
              )}
            </div>

            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                className={`form-control ${
                  errors.fechaNacimiento ? "is-invalid" : ""
                }`}
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
              {errors.fechaNacimiento && (
                <div className="invalid-feedback">
                  {errors.fechaNacimiento}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label>RUT</label>
              <input
                type="text"
                className={`form-control ${errors.rut ? "is-invalid" : ""}`}
                placeholder="Ej: 12345678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
              />
              {errors.rut && (
                <div className="invalid-feedback">{errors.rut}</div>
              )}
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button type="submit" className="btn-registro">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;