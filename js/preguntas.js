// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", function() {
  const btnVolver = document.getElementById("btnVolverInicio");

  btnVolver.addEventListener("click", function() {
    // Redirige al inicio
    window.location.href = "inicio.html";
  });
});
