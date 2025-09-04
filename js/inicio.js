<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  // Botón "Registrarse"
  document.querySelector(".btn-outline-primary").addEventListener("click", function() {
    window.location.href = "registro.html";
  });

  // Botón "Clave Única"
  document.getElementById("btnClaveUnica").addEventListener("click", function() {
    console.log("Botón Clave Única presionado");
    window.location.href = "login.html";
  });

  // Formulario contacto
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    contactForm.reset();

    successMessage.textContent = 'Contacto realizado con éxito';
    successMessage.style.display = 'block';

    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  });
});
=======
// Capturar el botón de registro
document.querySelector(".btn-outline-primary").addEventListener("click", function() {
  // Redirigir a la página de registro
  window.location.href = "registro.html";
});


// Botón Clave Única -> login.html
document.getElementById("btnClaveUnica").addEventListener("click", function() {
    window.location.href = "login.html";
});
>>>>>>> 3804213c400f9e4e1183a91f34e2efe4863c19cc
