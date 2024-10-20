// Variables globales para saber si estamos en modo edición
let idEnEdicionRecluso = null;
let idEnEdicionEmpleado = null;
let idEnEdicionVisita = null;

// Función para manejar el registro o edición de reclusos
function agregarRecluso(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores de los campos
    const nombre = document.getElementById("nombreRecluso").value;
    const id = document.getElementById("idRecluso").value;
    const delitos = document.getElementById("delitosRecluso").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const condena = document.getElementById("condenaRecluso").value; // Campo de condena

    // Crear objeto recluso
    const recluso = { id, nombre, delitos, fechaIngreso, condena };

    // Obtener la lista de reclusos del almacenamiento local
    let reclusos = JSON.parse(localStorage.getItem("reclusos")) || [];

    if (idEnEdicionRecluso) {
        // Si estamos en modo edición, actualizamos el recluso existente
        const index = reclusos.findIndex(r => r.id === idEnEdicionRecluso);
        reclusos[index] = recluso;
        idEnEdicionRecluso = null; // Salimos del modo edición
    } else {
        // Si no, agregamos un nuevo recluso
        reclusos.push(recluso);
    }

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("reclusos", JSON.stringify(reclusos));

    // Refrescar tabla
    cargarReclusos();
    document.getElementById("reclusoForm").reset();
}

// Función para agregar recluso a la tabla
function agregarReclusoATabla(recluso) {
    const reclusosList = document.getElementById("reclusosList");
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${recluso.id}</td>
        <td>${recluso.nombre}</td>
        <td>${recluso.delitos}</td>
        <td>${recluso.fechaIngreso}</td>
        <td>${recluso.condena}</td>
        <td>
            <button class="btn btn-warning btn-editar" data-id="${recluso.id}">Editar</button>
            <button class="btn btn-danger btn-eliminar" data-id="${recluso.id}">Eliminar</button>
        </td>
    `;

    reclusosList.appendChild(row);

    // Añadir eventos a los botones de la tabla
    const btnEditar = row.querySelector(".btn-editar");
    const btnEliminar = row.querySelector(".btn-eliminar");

    btnEditar.addEventListener("click", () => editarRecluso(recluso.id));
    btnEliminar.addEventListener("click", () => eliminarRecluso(recluso.id));
}

// Función para editar un recluso
function editarRecluso(id) {
    const reclusos = JSON.parse(localStorage.getItem("reclusos")) || [];
    const recluso = reclusos.find(r => r.id === id);
    if (recluso) {
        document.getElementById("nombreRecluso").value = recluso.nombre;
        document.getElementById("idRecluso").value = recluso.id;
        document.getElementById("delitosRecluso").value = recluso.delitos;
        document.getElementById("fechaIngreso").value = recluso.fechaIngreso;
        document.getElementById("condenaRecluso").value = recluso.condena;

        idEnEdicionRecluso = recluso.id; // Guardamos el ID para saber que estamos editando
    }
}

// Función para eliminar un recluso
function eliminarRecluso(id) {
    let reclusos = JSON.parse(localStorage.getItem("reclusos")) || [];
    reclusos = reclusos.filter(r => r.id !== id);
    localStorage.setItem("reclusos", JSON.stringify(reclusos));
    cargarReclusos();
}

// Cargar reclusos del almacenamiento local al cargar la página
function cargarReclusos() {
    const reclusosList = document.getElementById("reclusosList");
    reclusosList.innerHTML = ""; // Limpiar tabla
    const reclusos = JSON.parse(localStorage.getItem("reclusos")) || [];
    reclusos.forEach(agregarReclusoATabla);
}

// Funciones para manejar el registro o edición de empleados
function agregarPersonal(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores de los campos
    const nombre = document.getElementById("nombreEmpleado").value;
    const id = document.getElementById("idEmpleado").value;
    const profesion = document.getElementById("profesionEmpleado").value;
    const sexo = document.getElementById("sexoEmpleado").value;
    const fechaIngreso = document.getElementById("fechaIngresoEmpleado").value;

    // Crear objeto empleado
    const empleado = { id, nombre, profesion, sexo, fechaIngreso };

    // Obtener la lista de empleados del almacenamiento local
    let personal = JSON.parse(localStorage.getItem("personal")) || [];

    if (idEnEdicionEmpleado) {
        // Si estamos en modo edición, actualizamos el empleado existente
        const index = personal.findIndex(e => e.id === idEnEdicionEmpleado);
        personal[index] = empleado;
        idEnEdicionEmpleado = null; // Salimos del modo edición
    } else {
        // Si no, agregamos un nuevo empleado
        personal.push(empleado);
    }

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("personal", JSON.stringify(personal));

    // Refrescar tabla
    cargarPersonal();
    document.getElementById("personalForm").reset();
}

// Función para agregar empleado a la tabla
function agregarPersonalATabla(empleado) {
    const personalList = document.getElementById("personalList");
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${empleado.id}</td>
        <td>${empleado.nombre}</td>
        <td>${empleado.profesion}</td>
        <td>${empleado.sexo}</td>
        <td>${empleado.fechaIngreso}</td>
        <td>
            <button class="btn btn-warning btn-editar" data-id="${empleado.id}">Editar</button>
            <button class="btn btn-danger btn-eliminar" data-id="${empleado.id}">Eliminar</button>
        </td>
    `;

    personalList.appendChild(row);

    // Añadir eventos a los botones de la tabla
    const btnEditar = row.querySelector(".btn-editar");
    const btnEliminar = row.querySelector(".btn-eliminar");

    btnEditar.addEventListener("click", () => editarPersonal(empleado.id));
    btnEliminar.addEventListener("click", () => eliminarPersonal(empleado.id));
}

// Función para editar un empleado
function editarPersonal(id) {
    const personal = JSON.parse(localStorage.getItem("personal")) || [];
    const empleado = personal.find(e => e.id === id);
    if (empleado) {
        document.getElementById("nombreEmpleado").value = empleado.nombre;
        document.getElementById("idEmpleado").value = empleado.id;
        document.getElementById("profesionEmpleado").value = empleado.profesion;
        document.getElementById("sexoEmpleado").value = empleado.sexo;
        document.getElementById("fechaIngresoEmpleado").value = empleado.fechaIngreso;

        idEnEdicionEmpleado = empleado.id; // Guardamos el ID para saber que estamos editando
    }
}

// Función para eliminar un empleado
function eliminarPersonal(id) {
    let personal = JSON.parse(localStorage.getItem("personal")) || [];
    personal = personal.filter(e => e.id !== id);
    localStorage.setItem("personal", JSON.stringify(personal));
    cargarPersonal();
}

// Cargar personal del almacenamiento local al cargar la página
function cargarPersonal() {
    const personalList = document.getElementById("personalList");
    personalList.innerHTML = ""; // Limpiar tabla
    const personal = JSON.parse(localStorage.getItem("personal")) || [];
    personal.forEach(agregarPersonalATabla);
}

// Funciones para manejar el historial de visitas
function agregarVisita(event) {
    event.preventDefault();

    const idRecluso = document.getElementById('idReclusoVisita').value;
    const nombreVisitante = document.getElementById('nombreVisitante').value;
    const fechaVisita = document.getElementById('fechaVisita').value;

    // Crea un objeto de visita
    const visita = {
        reclusoId: idRecluso, // Cambiado para que coincida con lo que se usa en agregarVisitaATabla
        visitanteNombre: nombreVisitante, // Cambiado para que coincida con lo que se usa en agregarVisitaATabla
        fechaVisita
    };

    // Recupera las visitas existentes del localStorage
    const visitas = JSON.parse(localStorage.getItem('visitas')) || [];

    // Agrega la nueva visita
    visitas.push(visita);

    // Guarda de nuevo en el localStorage
    localStorage.setItem('visitas', JSON.stringify(visitas));

    console.log(`Visita agregada: ${JSON.stringify(visita)}`);

    // Limpiar el formulario
    document.getElementById('visitasForm').reset();

    // Cargar las visitas nuevamente
    cargarVisitas();
}




// Función para agregar visita a la tabla
function agregarVisitaATabla(visita) {
    const visitasList = document.getElementById("visitasList");
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${visita.reclusoId}</td>
        <td>${visita.visitanteNombre}</td>
        <td>${visita.fechaVisita}</td>
        <td>
            <button class="btn btn-warning btn-editar" data-id="${visita.reclusoId}">Editar</button>
            <button class="btn btn-danger btn-eliminar" data-id="${visita.reclusoId}">Eliminar</button>
        </td>
    `;

    visitasList.appendChild(row);

    // Añadir eventos a los botones de la tabla
    const btnEditar = row.querySelector(".btn-editar");
    const btnEliminar = row.querySelector(".btn-eliminar");

    btnEditar.addEventListener("click", () => editarVisita(visita.reclusoId));
    btnEliminar.addEventListener("click", () => eliminarVisita(visita.reclusoId));
}


// Función para editar una visita
function editarVisita(id) {
    const visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    const visita = visitas.find(v => v.reclusoId === id);
    if (visita) {
        document.getElementById("idVisitaRecluso").value = visita.reclusoId;
        document.getElementById("nombreVisitante").value = visita.visitanteNombre;
        document.getElementById("fechaVisita").value = visita.fechaVisita;

        idEnEdicionVisita = visita.reclusoId; // Guardamos el ID para saber que estamos editando
    }
}

// Función para eliminar una visita
function eliminarVisita(id) {
    let visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    visitas = visitas.filter(v => v.reclusoId !== id);
    localStorage.setItem("visitas", JSON.stringify(visitas));
    cargarVisitas();
}

// Cargar visitas del almacenamiento local al cargar la página
function cargarVisitas() {
    const visitasList = document.getElementById("visitasList");
    visitasList.innerHTML = ""; // Limpiar tabla
    const visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    visitas.forEach(agregarVisitaATabla);
}


// Inicializar listas al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarReclusos();
    cargarPersonal();
    cargarVisitas();
});

// Función para cerrar sesión
document.getElementById("cerrarSesion").addEventListener("click", function() {
    // Limpiar cualquier dato relacionado con la sesión
    localStorage.removeItem("usuario"); // Si tienes un usuario guardado en el localStorage

    // Redirigir a la página de inicio (puedes cambiar a la URL que desees)
    window.location.href = "login.html"; // Cambia "login.html" a la URL de tu página de inicio de sesión
});
