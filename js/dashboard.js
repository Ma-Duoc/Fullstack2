// Mostrar formulario 
function mostrarFormulario() {
    document.getElementById('formEditar').style.display = 'block';
    document.getElementById('datosDisplay').style.display = 'none';


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


function cancelarEdicion() {
    document.getElementById('formEditar').style.display = 'none';
    document.getElementById('datosDisplay').style.display = 'block';
}

// Guardar cambios en sessionStorage
function guardarCambios(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const telefono = document.getElementById('telefonoInput').value.trim();

    // Guardar en sessionStorage
    sessionStorage.setItem('nombre', nombre);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('telefono', telefono);


    document.getElementById('nombreDisplay').textContent = nombre;
    document.getElementById('emailDisplay').textContent = email;
    document.getElementById('telefonoDisplay').textContent = telefono;

    cancelarEdicion();
}


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


document.querySelector(".btn-outline-light").addEventListener("click", function (e) {
    e.preventDefault();
    sessionStorage.clear();
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



