// Mostrar formulario y ocultar vista de datos
function mostrarFormulario() {
    document.getElementById('formEditar').style.display = 'block';
    document.getElementById('datosDisplay').style.display = 'none';
  
    // Cargar datos actuales a los inputs (por si hay datos guardados en sessionStorage)
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
    // Limpiar campo contraseña por seguridad
    document.getElementById('contrasenaInput').value = '';
  }
  
  // Guardar cambios en sessionStorage y actualizar vista
  function guardarCambios(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombreInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const telefono = document.getElementById('telefonoInput').value.trim();
    // No se guarda contraseña en sessionStorage por seguridad
  
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
  
    if (nombreGuardado)
      document.getElementById('nombreDisplay').textContent = nombreGuardado;
    if (emailGuardado)
      document.getElementById('emailDisplay').textContent = emailGuardado;
    if (telefonoGuardado)
      document.getElementById('telefonoDisplay').textContent = telefonoGuardado;
  };
  