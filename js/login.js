// login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const rutInput = document.getElementById("rut");
  const passwordInput = document.getElementById("password");

  // Funciones reutilizadas del registro.js
  function setInvalid(input, msg) {
    input.classList.add("is-invalid");
    const feedback = input.parentElement.querySelector(".invalid-feedback");
    if (feedback && msg) feedback.textContent = msg;
  }

  function setValid(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  function normalizarRut(r) {
    return r.replace(/\./g, "").toUpperCase();
  }

  function validarRut(rutCompleto) {
    rutCompleto = normalizarRut(rutCompleto);
    if (!/^[0-9]+-[0-9K]$/.test(rutCompleto)) return false;
    const [numero, dv] = rutCompleto.split("-");
    if (numero.length < 7 || numero.length > 9) return false;

    let suma = 0, multiplicador = 2;
    for (let i = numero.length - 1; i >= 0; i--) {
      suma += parseInt(numero[i], 10) * multiplicador;
      multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }
    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
    return dv === dvEsperado;
  }

  function isStrongPassword(value) {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passRegex.test(value);
  }

  // Validadores específicos
  function validarCampoRut() {
    const valor = rutInput.value.trim();
    if (!validarRut(valor)) {
      setInvalid(rutInput, "Ingrese un RUT válido (ej: 12345678-9).");
      return false;
    }
    setValid(rutInput);
    return true;
  }

  function validarPassword() {
    if (!isStrongPassword(passwordInput.value)) {
      setInvalid(passwordInput, "Contraseña inválida. Debe tener mínimo 8 caracteres, mayúscula, minúscula y número.");
      return false;
    }
    setValid(passwordInput);
    return true;
  }

  // Evento de submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valido = true;
    valido = validarCampoRut() && valido;
    valido = validarPassword() && valido;

    if (!valido) return; // Detener si hay errores

    // Guardar login en sessionStorage
    sessionStorage.setItem("rut", normalizarRut(rutInput.value.trim()));
    sessionStorage.setItem("password", passwordInput.value);

    // Redirigir al dashboard
    window.location.href = "dashboard.html";
  });
});
