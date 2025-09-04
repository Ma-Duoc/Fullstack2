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
