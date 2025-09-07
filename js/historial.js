// historial.js

// 🔹 Cerrar sesión -> volver al inicio
document.querySelector(".btn-outline-light").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "inicio.html";
});

// 🔹 Sidebar navegación
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    if (this.textContent.includes("Inicio")) {
      window.location.href = "dashboard.html";
    } else if (this.textContent.includes("Citas")) {
      window.location.href = "citas.html";
    } else if (this.textContent.includes("Historial")) {
      window.location.href = "historial.html";
    }
  });
});

// 🔹 Descargar documentos (simulación)
document.querySelectorAll("button.btn-outline-primary").forEach(btn => {
  btn.addEventListener("click", function () {
    alert("📄 Descargando documento...");
  });
});

// =============================
// 🔹 FILTROS DEL HISTORIAL
// =============================

// Normaliza una cadena: quita acentos, pasa a minúsculas, trim y unifica singular/plural (quita 's' final).
function normalizeKey(str) {
  if (!str) return "";
  // descomponer acentos y quitar marcas diacríticas
  const sinAcentos = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return sinAcentos.toLowerCase().trim().replace(/s$/,""); // quita 's' final para unificar plural/singular
}

const filtroFecha = document.getElementById("filtro-fecha");
const filtroTipo = document.getElementById("filtro-tipo");
const btnFiltrar = document.getElementById("btn-filtrar");
const filas = document.querySelectorAll("tbody tr");

btnFiltrar.addEventListener("click", function () {
  const fechaSeleccionada = filtroFecha.value.trim(); // formato YYYY-MM-DD
  const tipoSeleccionado = normalizeKey(filtroTipo.value);

  filas.forEach(fila => {
    const fecha = fila.children[0].textContent.trim();           // columna Fecha
    const tipoCelda = fila.children[3].textContent.trim();      // columna Documento (Informes/Recetas/Exámenes)

    const tipoNormalizado = normalizeKey(tipoCelda);

    let coincide = true;

    // Filtro por fecha (si se seleccionó)
    if (fechaSeleccionada && fecha !== fechaSeleccionada) {
      coincide = false;
    }

    // Filtro por tipo (si se seleccionó)
    if (tipoSeleccionado && tipoNormalizado !== tipoSeleccionado) {
      coincide = false;
    }

    // Mostrar u ocultar fila según coincidencia
    fila.style.display = coincide ? "" : "none";
  });
});

