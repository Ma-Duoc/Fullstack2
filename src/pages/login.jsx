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
  const [loading, setLoading] = useState(false);


  const normalizarRut = (r) => r.replace(/\./g, "").toUpperCase();

  const validarRut = (rutCompleto) => {
    rutCompleto = normalizarRut(rutCompleto);
    return /^[0-9]{7,8}-[0-9K]$/.test(rutCompleto);
  };


  const isStrongPassword = (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validarRut(rut.trim())) {
      setErrorRut("Ingrese un RUT válido (ej: 12345678-9).");
      valid = false;
    } else {
      setErrorRut("");
    }


    if (!isStrongPassword(password)) {
      setErrorPassword(
        "Contraseña inválida. Debe tener mínimo 8 caracteres, mayúscula, minúscula y número."
      );
      valid = false;
    } else {
      setErrorPassword("");
    }

    if (!valid) return;

    setLoading(true);

    try {

      const response = await fetch(
        "https://demo0545743.mockable.io/api/v2/pacientes/todos"
      );
      const data = await response.json();

 
      const paciente = data.find(
        (p) => normalizarRut(p.rut) === normalizarRut(rut.trim())
      );

      if (paciente) {
        sessionStorage.setItem("rut", paciente.rut);
        sessionStorage.setItem("nombre", paciente.nombre);
        sessionStorage.setItem("email", paciente.correo);
        sessionStorage.setItem("telefono", paciente.telefono);
        sessionStorage.setItem("password", password);

        navigate("/dashboard");
      } else {
        setErrorRut("RUT no encontrado en la base de datos.");
      }
    } catch (error) {
      console.error("Error al conectar con Mockable:", error);
      setErrorRut("Ocurrió un error al validar el RUT. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">

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


      <section className="login-section d-flex justify-content-center align-items-center">
        <div
          className="card p-4 shadow-sm"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          <form onSubmit={handleSubmit}>

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

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Validando..." : "Ingresar"}
            </button>

            <div className="mt-2 text-center">
            <button
              type="button"
              className="btn btn-link text-decoration-none text-primary"
              onClick={() => navigate("/recuperar")}
            >
              ¿Has olvidado la contraseña?
            </button>
          </div>


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


      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">
          &copy; 2025 MEDICTIME | Mejorando la salud de Chile desde 1972
        </p>
      </footer>
    </div>
  );
}

