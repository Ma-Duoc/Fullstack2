// inicio.js
// JS mínimo para la página de inicio

// 🔹 Ejemplo: mostrar un mensaje en consola al cargar la página
console.log("inicio.js cargado correctamente");

// 🔹 Aquí puedes agregar funcionalidades para botones, animaciones o interacciones
// Por ejemplo, si quieres manejar algún click en botones específicos:

document.addEventListener("DOMContentLoaded", () => {
  // Botón de Clave Única (solo ejemplo)
  const claveUnicaBtn = document.querySelector(".boton-claveunica");
  if (claveUnicaBtn) {
    claveUnicaBtn.addEventListener("click", () => {
      console.log("Se hizo clic en Clave Única");
      // Si deseas, puedes redirigir a login.html
      // window.location.href = "login.html";
    });
  }

  // Modal Contacto: opcional si quieres manejar envío con JS
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Mostrar mensaje de éxito sin guardar en sessionStorage
      const successMsg = document.getElementById("successMessage");
      if (successMsg) {
        successMsg.textContent = "¡Mensaje enviado con éxito!";
        successMsg.style.display = "block";
      }
      // Limpiar formulario
      contactForm.reset();
    });
  }
});

