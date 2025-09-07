// 🔹 Cargar citas desde sessionStorage al iniciar
window.onload = function () {
    const citasGuardadas = JSON.parse(sessionStorage.getItem("citas")) || [];
    citasGuardadas.forEach(cita => agregarFilaCita(cita));

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
            if (this.textContent.includes("Inicio")) window.location.href = "dashboard.html";
            else if (this.textContent.includes("Citas")) window.location.href = "citas.html";
            else if (this.textContent.includes("Historial")) window.location.href = "historial.html";
        });
    });
};

// 🔹 Formulario de nueva cita
const formCita = document.getElementById("form-cita");
const citasLista = document.getElementById("citas-lista");

formCita.addEventListener("submit", function (e) {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const especialista = document.getElementById("especialista").value;
    const direccion = document.getElementById("direccion").value;

    if (!fecha || !hora || !especialista || !direccion) {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
    }

    const nuevaCita = { fecha, hora, especialista, direccion, estado: "Pendiente" };

    // Guardar en sessionStorage
    const citasGuardadas = JSON.parse(sessionStorage.getItem("citas")) || [];
    citasGuardadas.push(nuevaCita);
    sessionStorage.setItem("citas", JSON.stringify(citasGuardadas));

    agregarFilaCita(nuevaCita);
    formCita.reset();
    alert("✅ Nueva cita registrada");
});

// 🔹 Función para agregar fila a la tabla
function agregarFilaCita(cita) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <td>${cita.especialista}</td>
        <td>${cita.direccion}</td>
        <td><span class="badge bg-success">${cita.estado}</span></td>
        <td>
            <button class="btn btn-danger btn-sm eliminar-cita">
                <i class="bi bi-trash"></i> Eliminar
            </button>
        </td>
    `;

    fila.querySelector(".eliminar-cita").addEventListener("click", function () {
        fila.remove();
        eliminarCitaStorage(cita);
    });

    citasLista.appendChild(fila);
}

// 🔹 Eliminar cita del sessionStorage
function eliminarCitaStorage(cita) {
    let citasGuardadas = JSON.parse(sessionStorage.getItem("citas")) || [];
    citasGuardadas = citasGuardadas.filter(c => !(c.fecha === cita.fecha && c.hora === cita.hora && c.especialista === cita.especialista && c.direccion === cita.direccion));
    sessionStorage.setItem("citas", JSON.stringify(citasGuardadas));
}


