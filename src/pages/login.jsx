import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/estilos.css";

export default function Login() {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [errorRut, setErrorRut] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // Normaliza el RUT
  const normalizarRut = (r) => r.replace(/\./g, "").toUpperCase();

  // Valida formato y dígito verificador del RUT
  const validarRut = (rutCompleto) => {
    rutCompleto = normalizarRut(rutCompleto);
    if (!/^[0-9]+-[0-9K]$/.test(rutCompleto)) return false;

    const [numero, dv] = rutCompleto.split("-");
    if (numero.length < 7 || numero.length > 9) return false;

    let suma = 0,
      mul = 2;
    for (let i = numero.length - 1; i >= 0; i--) {
      suma += parseInt(numero[i], 10) * mul;
      mul = mul < 7 ? mul + 1 : 2;
    }
    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
    return dv === dvEsperado;
  };

  // Valida la contraseña (mínimo 8, mayúscula, minúscula y número)
  const isStrongPassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

  // Manejo del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Validación del RUT
    if (!validarRut(rut.trim())) {
      setErrorRut("Ingrese un RUT válido (ej: 12345678-9).");
      valid = false;
    } else {
      setErrorRut("");
    }

    // Validación de contraseña
    if (!isStrongPassword(password)) {
      setErrorPassword(
        "Contraseña inválida. Debe tener mínimo 8 caracteres, mayúscula, minúscula y número."
      );
      valid = false;
    } else {
      setErrorPassword("");
    }

    // Si todo está correcto
    if (valid) {
      sessionStorage.setItem("rut", normalizarRut(rut.trim()));
      sessionStorage.setItem("password", password);
      navigate("/dashboard"); // edirige usando React Router
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-light container">
          <button
            className="navbar-brand btn border-0 bg-transparent p-0"
            onClick={() => navigate("/inicio")}
          >
            <img
              src="https://i.imgur.com/100lvlZ.png"
              alt="MEDICTIME Logo"
              style={{ maxHeight: "60px" }}
            />
          </button>
        </nav>
      </header>

      {/*  Login con fondo */}
      <section className="login-section d-flex justify-content-center align-items-center">
        <div
          className="card p-4 shadow-sm"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          <form onSubmit={handleSubmit}>
            {/* RUT */}
            <div className="mb-3">
              <label htmlFor="rut" className="form-label">
                Rut
              </label>
              <input
                type="text"
                id="rut"
                className={`form-control ${
                  errorRut ? "is-invalid" : rut ? "is-valid" : ""
                }`}
                placeholder="Ej: 12345678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
              />
              {errorRut && <div className="invalid-feedback">{errorRut}</div>}
            </div>

            {/*  Contraseña */}
            <div className="mb-1 text-end">
              <button
                type="button"
                className="text-primary text-decoration-none btn btn-link p-0"
                onClick={() => navigate("/recuperar")}
              >
                ¿Has olvidado tu contraseña?
              </button>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errorPassword ? "is-invalid" : password ? "is-valid" : ""
                }`}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorPassword && (
                <div className="invalid-feedback">{errorPassword}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>

            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => navigate("/registro")}
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </div>
          </form>
        </div>
      </section>

      {/*  Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">
          &copy; 2025 MEDICTIME | Mejorando la salud de Chile desde 1972
        </p>
      </footer>
    </div>
  );
}


