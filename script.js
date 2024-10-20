// Función para manejar el registro de usuario
function register() {
    // Obtener valores de los campos
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    // Guardar usuario en localStorage
    const user = { role, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    // Redirigir a la página de inicio de sesión
    alert("Registro exitoso. Por favor, inicie sesión.");
    window.location.href = "login.html";
    return false; // Evitar el envío del formulario
}

// Función para manejar el inicio de sesión
function login() {
    // Obtener valores de los campos
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Obtener el usuario almacenado en localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Validar credenciales
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Inicio de sesión exitoso.");
        // Redirigir según el rol del usuario
        if (storedUser.role === "administrativo") {
            window.location.href = "gestion de reclusos.html";
        } else {
            window.location.href = "index.html"; // Redirigir a otra página para visitantes
        }
    } else {
        alert("Correo o contraseña incorrectos.");
    }
    return false; // Evitar el envío del formulario
}



function iniciarMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 4.706822, lng: -74.124357} // Coordenadas iniciales
    });

    var markers = {
        bogota: { position: {lat: 4.706822, lng: -74.124357}, title: "Bogotá" },
        cali: { position: {lat: 3.4135248, lng: -76.506592}, title: "Cali" },
        tunja: { position: {lat: 5.5480207, lng: -73.3563252}, title: "Tunja" },
        barranquilla: { position: {lat: 10.8865024, lng: -74.8596888}, title: "Barranquilla" },
        cartagena: { position: {lat: 10.4001987, lng: -75.5085254}, title: "Cartagena" },
        girardot: { position: {lat: 4.3082278, lng: -74.8337648}, title: "Girardot" }
    };

    // Crear los marcadores en el mapa
    for (const key in markers) {
        const marker = new google.maps.Marker({
            position: markers[key].position,
            map: map,
            title: markers[key].title
        });
    }

    // Función para centrar el mapa en la ubicación correspondiente
    function centerMap(city) {
        map.setCenter(markers[city].position);
        map.setZoom(10); // Ajusta el nivel de zoom si lo deseas
    }

    // Asignar eventos a los elementos de la lista
    document.getElementById('bogota').addEventListener('click', function() {
        centerMap('bogota');
    });
    document.getElementById('cali').addEventListener('click', function() {
        centerMap('cali');
    });
    document.getElementById('tunja').addEventListener('click', function() {
        centerMap('tunja');
    });
    document.getElementById('barranquilla').addEventListener('click', function() {
        centerMap('barranquilla');
    });
    document.getElementById('cartagena').addEventListener('click', function() {
        centerMap('cartagena');
    });
    document.getElementById('girardot').addEventListener('click', function() {
        centerMap('girardot');
    });
}
