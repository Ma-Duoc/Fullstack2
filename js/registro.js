const VALIDAR_RUT = true; 

const form = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const rut   = document.getElementById("rut");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


function setInvalid(input, msg) {
  input.classList.add("is-invalid");
  const feedback = input.parentElement.querySelector(".invalid-feedback");
  if (feedback && msg) feedback.textContent = msg;
}

function setValid(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}


function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function isStrongPassword(value) {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passRegex.test(value);
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


function validarNombre() {
  if (nombre.value.trim() === "") {
    setInvalid(nombre, "El nombre es obligatorio.");
    return false;
  }
  setValid(nombre);
  return true;
}

function validarEmail() {
  if (!isEmail(email.value.trim())) {
    setInvalid(email, "Por favor, ingresa un correo válido.");
    return false;
  }
  setValid(email);
  return true;
}

function validarCampoRut() {
  if (!VALIDAR_RUT) {
    setValid(rut);
    return true;
  }
  const valor = rut.value.trim();
  if (!validarRut(valor)) {
    setInvalid(rut, "Ingrese un RUT válido (ej: 12345678-9).");
    return false;
  }
  setValid(rut);
  return true;
}

function validarPassword() {
  if (!isStrongPassword(password.value)) {
    setInvalid(password, "Mínimo 8 caracteres, con mayúscula, minúscula y número.");
    return false;
  }
  setValid(password);
  return true;
}

function validarConfirmPassword() {
  if (confirmPassword.value === "" || confirmPassword.value !== password.value) {
    setInvalid(confirmPassword, "Las contraseñas no coinciden.");
    return false;
  }
  setValid(confirmPassword);
  return true;
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  let valido = true;
  valido = validarNombre()          && valido;
  valido = validarEmail()           && valido;
  valido = validarCampoRut()        && valido;
  valido = validarPassword()        && valido;
  valido = validarConfirmPassword() && valido;

  if (!valido) return; 

 
  const usuario = {
    nombre: nombre.value.trim(),
    email: email.value.trim(),
    rut: normalizarRut(rut.value.trim()),
    password: password.value 
  };

  sessionStorage.setItem("usuario", JSON.stringify(usuario));


  alert("✅ Registro exitoso. Serás redirigido al inicio.");

  // Redirigir tras 1.5 segundos
  setTimeout(() => {
    window.location.href = "inicio.html";
  }, 1500);


  form.reset();
  form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
});
