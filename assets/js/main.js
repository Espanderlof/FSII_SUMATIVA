let usuarios = [
    {
        email: "admin@albavets.cl",
        nombre: "Administrador",
        celular: "+56912345678",
        password: "Admin123!",
        fechaNacimiento: "1990-01-01",
        rol: "administrador"
    },
    {
        email: "jperez@gmail.com",
        nombre: "Juan Perez",
        celular: "+56987654321",
        password: "Usuario1!",
        fechaNacimiento: "1985-05-10",
        rol: "usuario"
    },
    {
        email: "mgomez@gmail.com",
        nombre: "Maria Gomez",
        celular: "+56955555555",
        password: "Usuario2!",
        fechaNacimiento: "1992-12-20",
        rol: "usuario"
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
    if (window.location.pathname.endsWith("index.html")) {
        loadCategories();
        loadProducts();
    }
});

function validarFormatoContraseña(contraseña) {
    // Expresión regular para validar el formato de la contraseña
    const regexContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,15}$/;

    // Validar el formato de la contraseña
    if (regexContraseña.test(contraseña)) {
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
        if (!validarFormatoContraseña(password)) {
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
            rol: rol
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
            // Aquí puedes redirigir al usuario a la página principal o realizar otras acciones
        } else {
            // Las credenciales son inválidas
            alert('Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.');
        }
    });
}

// Obtener el formulario de recuperación de contraseña
const recuperarForm = document.getElementById("recuperarForm");

if (recuperarForm) {
    // Agregar un evento de escucha al envío del formulario
    recuperarForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener el valor del campo de correo electrónico
        const email = document.getElementById("recuperarEmail").value;

        // Aquí puedes realizar la lógica de recuperación de contraseña, como enviar un enlace de recuperación al correo electrónico proporcionado
        console.log("Enviando enlace de recuperación de contraseña a:", email);
        // Aquí puedes agregar tu lógica de recuperación de contraseña
    });    
}