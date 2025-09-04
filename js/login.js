document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("loginEmail").value.trim();
    const clave = document.getElementById("loginPassword").value.trim();

    if (usuario === "" || clave === "") {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Simular login exitoso
    alert("¡Inicio de sesión exitoso!");

    // Redirigir
    setTimeout(() => {
      window.location.href = "dashboard.html"; // Cambia si tienes otra página
    }, 1500);
  });
});
