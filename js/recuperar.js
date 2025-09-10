const form = document.getElementById("resetForm");
const email = document.getElementById("email");
const notification = document.getElementById("notification");

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

// Validar campo email
function validarEmail() {
  if (!isEmail(email.value.trim())) {
    setInvalid(email, "Por favor, ingrese un correo válido.");
    return false;
  }
  setValid(email);
  return true;
}


form.addEventListener("submit", function(event) {
  event.preventDefault();
  event.stopPropagation();

  // Validar email
  if (!validarEmail()) return;

 
  notification.style.display = "block";

  // Redirigir tras 2 segundos
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);


  form.reset();
  form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
});
