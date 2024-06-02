let usuarios = [
    {
        email: "admin@albavets.cl",
        nombre: "Administrador",
        celular: "+56912345678",
        password: "Admin123!",
        fechaNacimiento: "1990-01-01",
        rol: "administrador",
        token: ""
    },
    {
        email: "jperez@gmail.com",
        nombre: "Juan Perez",
        celular: "+56987654321",
        password: "Usuario1!",
        fechaNacimiento: "1985-05-10",
        rol: "usuario",
        token: ""
    },
    {
        email: "mgomez@gmail.com",
        nombre: "Maria Gomez",
        celular: "+56955555555",
        password: "Usuario2!",
        fechaNacimiento: "1992-12-20",
        rol: "usuario",
        token: ""
    }
];

// Verificar si la variable 'usuarios' ya está almacenada en el localStorage
if (localStorage.getItem('usuarios') === null) {
    // La variable 'usuarios' no está almacenada en el localStorage
    // Convertir el arreglo de usuarios a formato JSON y almacenarlo en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('La variable "usuarios" ha sido almacenada en el localStorage.');
}

// Variable JSON con las categorías
const categorias = [
    {
        id: 0,
        nombre: "Todas las categorías",
    },
    {
        id: 1,
        nombre: "Collares",
    },
    {
        id: 2,
        nombre: "Correas",
    },
    {
        id: 3,
        nombre: "Platos y comederos",
    },
];

// Variable JSON con los productos
const productos = [
    {
        id: 1,
        nombre: "Plato antianciedad",
        descripcion:
            "Plato antianciedad para perros y gatos. Ayuda a evitar la ansiedad en la comida.",
        imagen: "1.jpg",
        precio: 6500,
        categoria: 3,
    },
    {
        id: 2,
        nombre: "Collar pañuelo",
        descripcion:
            "Collar pañuelo para perros. Collar ajustable con pañuelo desmontable.",
        imagen: "2.jpg",
        precio: 4500,
        categoria: 1,
    },
    {
        id: 3,
        nombre: "Correa reflectante",
        descripcion:
            "Correa reflectante para perros. Correa ajustable con costuras reflectantes.",
        imagen: "3.jpg",
        precio: 5500,
        categoria: 3,
    },
];

const pageUrl = window.location.href;
const pageName = pageUrl.split('/').pop();

// Función para cargar las categorías desde la variable JSON
function loadCategories() {
    const categoryList = document.getElementById("categoryList");
    categorias.forEach((category) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = category.nombre;
        categoryList.appendChild(listItem);
    });
}

// Función para cargar los productos desde la variable JSON
function loadProducts() {
    const productList = document.getElementById("productList");
    productos.forEach((product) => {
        const col = document.createElement("div");
        col.classList.add("col", "mb-4");
        col.innerHTML = `
            <div class="card h-100">
                <img src="assets/img/productos/${product.imagen}" class="card-img-top" alt="${product.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.nombre}</h5>
                    <p class="card-text flex-grow-1">${product.descripcion}</p>
                    <div class="mt-auto">
                        <a href="#" class="btn btn-primary">Agregar al carrito</a>
                    </div>
                </div>
            </div>
        `;
        productList.appendChild(col);
    });
}

// Cargar las categorías y los productos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    if (pageName == "index.html") {
        loadCategories();
        loadProducts();
    }
});

function validarFormatoPassword(password) {
    // Expresión regular para validar el formato de la contraseña
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,15}$/;

    // Validar el formato de la contraseña
    if (regexPassword.test(password)) {
        return true; // La contraseña cumple con el formato requerido
    } else {
        return false; // La contraseña no cumple con el formato requerido
    }
}

function validarEdadMinima(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    return edad >= 14;
}




// Obtener el formulario de registro
const registroForm = document.getElementById('registroForm');

if (registroForm) {
    // Agregar un evento de escucha al envío del formulario
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('nombre').value;
        const celular = document.getElementById('celular').value;
        const password = document.getElementById('password').value;
        const repetirPassword = document.getElementById('repetirPassword').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const rol = "usuario"; // Por defecto, el rol de los nuevos usuarios es "usuario"

        // Validar que todos los campos estén completos
        if (email === '' || nombre === '' || celular === '' || password === '' || repetirPassword === '' || fechaNacimiento === '') {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        // Validar el formato de la contraseña
        if (!validarFormatoPassword(password)) {
            alert('La contraseña debe tener entre 6 y 15 caracteres, y contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial.');
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== repetirPassword) {
            alert('Las contraseñas no coinciden. Por favor, verifica nuevamente.');
            return;
        }

        // Validar que el usuario sea mayor de 14 años
        if (!validarEdadMinima(fechaNacimiento)) {
            alert('Debes ser mayor de 14 años para registrarte.');
            return;
        }

        // Obtener los usuarios del localStorage (si existen)
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el usuario ya está registrado
        const usuarioExistente = usuarios.find(usuario => usuario.email === email);
        if (usuarioExistente) {
            alert('El usuario ya está registrado. Por favor, inicia sesión o utiliza otro correo electrónico.');
            return;
        }

        // Crear un objeto de usuario con los datos del formulario
        const nuevoUsuario = {
            email: email,
            nombre: nombre,
            celular: celular,
            password: password,
            fechaNacimiento: fechaNacimiento,
            rol: rol,
            token: ""
        };

        // Agregar el nuevo usuario al arreglo de usuarios
        usuarios.push(nuevoUsuario);

        // Almacenar el arreglo de usuarios actualizado en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Enviar una alerta de registro exitoso
        alert('¡Usuario registrado correctamente!');

        // Limpiar los campos del formulario después de agregar el usuario
        registroForm.reset();
    });
}






// Obtener el formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    // Agregar un evento de escucha al envío del formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Obtener los usuarios del localStorage
        const usuariosJSON = localStorage.getItem('usuarios');
        const usuarios = JSON.parse(usuariosJSON);

        // Buscar el usuario por correo electrónico y contraseña
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.password === password);

        if (usuarioEncontrado) {
            // El usuario ha iniciado sesión correctamente
            alert('¡Inicio de sesión exitoso!');

            // Crear un nuevo objeto de usuario sin la contraseña
            const usuarioSinContraseña = {
                email: usuarioEncontrado.email,
                nombre: usuarioEncontrado.nombre,
                celular: usuarioEncontrado.celular,
                fechaNacimiento: usuarioEncontrado.fechaNacimiento,
                rol: usuarioEncontrado.rol
            };

            // Guardar la sesión del usuario en el localStorage sin la contraseña
            localStorage.setItem('sesionUsuario', JSON.stringify(usuarioSinContraseña));

            // Redirigir al usuario al index
            window.location.href = 'index.html';
        } else {
            // Las credenciales son inválidas
            alert('Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.');
        }
    });
}

// Obtener el formulario de recuperación de contraseña
const recuperarForm = document.getElementById('recuperarForm');

// Agregar un evento de escucha al envío del formulario
if (recuperarForm) {
    recuperarForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const recuperarEmail = document.getElementById('recuperarEmail').value;
        const token = document.getElementById('token').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Obtener los usuarios del localStorage
        const usuariosJSON = localStorage.getItem('usuarios');

        if (usuariosJSON) {
            // Convertir el JSON a un arreglo de usuarios
            const usuarios = JSON.parse(usuariosJSON);

            // Buscar el usuario por correo electrónico y token
            const usuario = usuarios.find(usuario => usuario.email === recuperarEmail && usuario.token === token);

            if (usuario) {
                // Validar el formato de la nueva contraseña
                if (!validarFormatoPassword(newPassword)) {
                    alert('La contraseña debe tener entre 6 y 15 caracteres, y contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial.');
                    return;
                }

                // Validar que las contraseñas coincidan
                if (newPassword !== confirmPassword) {
                    alert('Las contraseñas no coinciden. Por favor, verifica nuevamente.');
                    return;
                }

                // Actualizar la contraseña del usuario
                usuario.password = newPassword;

                // Actualizar el arreglo de usuarios en el localStorage
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                // Mostrar una alerta de éxito
                alert('La contraseña ha sido actualizada correctamente.');

                // Redirigir al usuario a la página de inicio de sesión
                window.location.href = 'login.html';
            } else {
                // El correo electrónico o el token no son válidos
                alert('El correo electrónico o el token ingresados no son válidos. Por favor, verifica nuevamente.');
            }
        } else {
            // No hay usuarios registrados en el localStorage
            alert('No hay usuarios registrados.');
        }
    });
}

function generarToken() {
    // Obtener el valor del campo de correo electrónico
    const recuperarEmail = document.getElementById('recuperarEmail').value;

    // Obtener los usuarios del localStorage
    const usuariosJSON = localStorage.getItem('usuarios');

    if (usuariosJSON) {
        // Convertir el JSON a un arreglo de usuarios
        const usuarios = JSON.parse(usuariosJSON);

        // Buscar el usuario por correo electrónico
        const usuario = usuarios.find(usuario => usuario.email === recuperarEmail);

        if (usuario) {
            // Generar un token aleatorio de 6 dígitos
            const token = Math.floor(Math.random() * 900000) + 100000;

            // Asignar el token generado al usuario encontrado
            usuario.token = token.toString();

            // Mostrar el token en una alerta
            alert('Tu token de recuperación es: ' + token);

            // Aquí puedes agregar la lógica para enviar el token por correo electrónico al usuario
            // utilizando un servicio de correo electrónico o una API de envío de correos

            // Actualizar el arreglo de usuarios en el localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        } else {
            // El correo electrónico no está registrado
            alert('El correo electrónico ingresado no está registrado.');
        }
    } else {
        // No hay usuarios registrados en el localStorage
        alert('No hay usuarios registrados.');
    }
}

// Obtener el elemento del menú "Mi cuenta"
const accountDropdown = document.getElementById('accountDropdown');

// Obtener la sesión del usuario del localStorage
const sesionUsuario = JSON.parse(localStorage.getItem('sesionUsuario'));

// Generar las opciones del menú "Mi cuenta" según la sesión del usuario
if (sesionUsuario) {
    // El usuario está logueado
    accountDropdown.innerHTML = `
        <li><a class="dropdown-item" href="modificar_perfil.html">Modificar mi perfil</a></li>
        <li><a class="dropdown-item" href="#" id="logoutLink">Cerrar sesión</a></li>
    `;

    // Agregar un evento de clic al enlace "Cerrar sesión"
    const logoutLink = document.getElementById('logoutLink');
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Borrar la sesión del usuario del localStorage
        localStorage.removeItem('sesionUsuario');
        // Redirigir al index
        window.location.href = 'index.html';
    });
} else {
    // El usuario no está logueado
    accountDropdown.innerHTML = `
        <li><a class="dropdown-item" href="login.html">Iniciar sesión</a></li>
        <li><a class="dropdown-item" href="registrarme.html">Registrarse</a></li>
    `;
}

// Obtener los formularios
const modificarPerfilForm = document.getElementById('modificarPerfilForm');
const modificarContraseñaForm = document.getElementById('modificarContraseñaForm');


// Obtener los usuarios del localStorage
const usuariosJSON = localStorage.getItem('usuarios');

// Llenar los campos del formulario de modificar perfil con los datos del usuario
if (sesionUsuario) {
    if (pageName == "modificar_perfil.html") {
        document.getElementById('nombre').value = sesionUsuario.nombre;
        document.getElementById('celular').value = sesionUsuario.celular;
        document.getElementById('fechaNacimiento').value = sesionUsuario.fechaNacimiento;
    }
}

// Manejar el envío del formulario de modificar perfil
if (modificarPerfilForm) {
    modificarPerfilForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuarios = JSON.parse(usuariosJSON);

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const celular = document.getElementById('celular').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;

        // Buscar el usuario por correo electrónico y actualizar sus datos
        usuarios.forEach(usuario => {
            if (usuario.email === sesionUsuario.email) {
                usuario.nombre = nombre;
                usuario.celular = celular;
                usuario.fechaNacimiento = fechaNacimiento;
            }
        });

        // Actualizar el arreglo de usuarios en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Actualizar la sesión del usuario en el localStorage
        sesionUsuario.nombre = nombre;
        sesionUsuario.celular = celular;
        sesionUsuario.fechaNacimiento = fechaNacimiento;
        localStorage.setItem('sesionUsuario', JSON.stringify(sesionUsuario));

        alert('Información personal actualizada correctamente.');
    });
}

// Manejar el envío del formulario de modificar contraseña
if (modificarContraseñaForm) {
    modificarContraseñaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuarios = JSON.parse(usuariosJSON);

        // Obtener los valores de los campos del formulario
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, verifica nuevamente.');
            return;
        }

        // Validar el formato de la nueva contraseña
        if (!validarFormatoPassword(newPassword)) {
            alert('La contraseña debe tener entre 6 y 15 caracteres, y contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial.');
            return;
        }

        // Buscar el usuario por correo electrónico y actualizar su contraseña
        usuarios.forEach(usuario => {
            if (usuario.email === sesionUsuario.email) {
                usuario.password = newPassword;
            }
        });

        // Actualizar el arreglo de usuarios en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Contraseña actualizada correctamente.');
    });
}