// Mostrar formulario y ocultar vista de datos
function mostrarFormulario() {
    document.getElementById('formEditar').style.display = 'block';
    document.getElementById('datosDisplay').style.display = 'none';

    // Cargar datos actuales a los inputs
    document.getElementById('nombreInput').value =
        sessionStorage.getItem('nombre') ||
        document.getElementById('nombreDisplay').textContent;
    document.getElementById('emailInput').value =
        sessionStorage.getItem('email') ||
        document.getElementById('emailDisplay').textContent;
    document.getElementById('telefonoInput').value =
        sessionStorage.getItem('telefono') ||
        document.getElementById('telefonoDisplay').textContent;
}

// Cancelar edición y volver a la vista de datos
function cancelarEdicion() {
    document.getElementById('formEditar').style.display = 'none';
    document.getElementById('datosDisplay').style.display = 'block';
}

// Guardar cambios en sessionStorage y actualizar vista
function guardarCambios(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const telefono = document.getElementById('telefonoInput').value.trim();

    // Guardar en sessionStorage
    sessionStorage.setItem('nombre', nombre);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('telefono', telefono);

    // Actualizar vista
    document.getElementById('nombreDisplay').textContent = nombre;
    document.getElementById('emailDisplay').textContent = email;
    document.getElementById('telefonoDisplay').textContent = telefono;

    cancelarEdicion();
}

// Al cargar la página, cargar datos guardados en sessionStorage si existen
window.onload = function () {
    const nombreGuardado = sessionStorage.getItem('nombre');
    const emailGuardado = sessionStorage.getItem('email');
    const telefonoGuardado = sessionStorage.getItem('telefono');
    const rutGuardado = sessionStorage.getItem('rut');

    if (nombreGuardado) document.getElementById('nombreDisplay').textContent = nombreGuardado;
    if (emailGuardado) document.getElementById('emailDisplay').textContent = emailGuardado;
    if (telefonoGuardado) document.getElementById('telefonoDisplay').textContent = telefonoGuardado;
    if (rutGuardado) document.getElementById('rutDisplay').textContent = rutGuardado;
};

// Cerrar sesión
document.querySelector(".btn-outline-light").addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "inicio.html";
});

// Sidebar navegación
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



