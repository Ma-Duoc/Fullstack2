import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Recuperar = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isEmail(email.trim())) {
      setError("Por favor, ingrese un correo válido.");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);

    setEmail("");

    // 🔹 Redirige al login después de 2 segundos
    setTimeout(() => {
      navigate("/login"); 
    }, 2000);
  };
  

  return (
    
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      {success && (
        <div
          className="card bg-success text-white text-center position-fixed top-0 start-50 translate-middle-x shadow-sm"
          style={{ zIndex: 1050, maxWidth: "400px" }}
        >
          <div className="card-body p-2">
            ✅ El correo ha sido enviado con éxito.
          </div>
        </div>
      )}
      

      <div className="card shadow-sm p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="https://i.imgur.com/100lvlZ.png"
            alt="MEDICTIME Logo"
            className="img-fluid"
            style={{ maxHeight: "80px" }}
          />
        </div>

        <h2 className="text-center mb-3">Restablecer su contraseña</h2>

        <p className="text-center text-muted mb-4">
          Ingrese la dirección de correo electrónico verificada de su cuenta y
          le enviaremos un enlace para restablecer su contraseña.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${error ? "is-invalid" : email ? "is-valid" : ""}`}
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Enviar correo
          </button>
        </form>
      </div>
    </div>
    
  );

  
};

export default Recuperar;
