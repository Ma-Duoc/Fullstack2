// historial.js

// Cerrar sesión: volver al inicio
document.querySelector(".btn-outline-light").addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "inicio.html";
});


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


document.querySelectorAll("button.btn-outline-primary").forEach(btn => {
  btn.addEventListener("click", function () {
    alert("📄 Descargando documento...");
  });
});


function normalizeKey(str) {
  if (!str) return "";

  const sinAcentos = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return sinAcentos.toLowerCase().trim().replace(/s$/,"");
}

const filtroFecha = document.getElementById("filtro-fecha");
const filtroTipo = document.getElementById("filtro-tipo");
const btnFiltrar = document.getElementById("btn-filtrar");
const filas = document.querySelectorAll("tbody tr");

btnFiltrar.addEventListener("click", function () {
  const fechaSeleccionada = filtroFecha.value.trim(); 
  const tipoSeleccionado = normalizeKey(filtroTipo.value);

  filas.forEach(fila => {
    const fecha = fila.children[0].textContent.trim();          
    const tipoCelda = fila.children[3].textContent.trim();      
    const tipoNormalizado = normalizeKey(tipoCelda);

    let coincide = true;

    // Filtro por fecha 
    if (fechaSeleccionada && fecha !== fechaSeleccionada) {
      coincide = false;
    }

    // Filtro por tipo 
    if (tipoSeleccionado && tipoNormalizado !== tipoSeleccionado) {
      coincide = false;
    }

    fila.style.display = coincide ? "" : "none";
  });
});

