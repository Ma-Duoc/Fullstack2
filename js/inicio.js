


console.log("inicio.js cargado correctamente");


document.addEventListener("DOMContentLoaded", () => {
 
  const claveUnicaBtn = document.querySelector(".boton-claveunica");
  if (claveUnicaBtn) {
    claveUnicaBtn.addEventListener("click", () => {
      console.log("Se hizo clic en Clave Única");

    });
  }


  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const successMsg = document.getElementById("successMessage");
      if (successMsg) {
        successMsg.textContent = "¡Mensaje enviado con éxito!";
        successMsg.style.display = "block";
      }

      contactForm.reset();
    });
  }
});

