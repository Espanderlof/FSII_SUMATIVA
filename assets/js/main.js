let usuarios = [
    {
        email: "admin@albavets.cl",
        nombre: "Administrador",
        celular: "+56912345678",
        password: "Admin123!",
        fechaNacimiento: "1990-01-01",
        rol: "administrador",
        token: "",
    },
    {
        email: "jperez@gmail.com",
        nombre: "Juan Perez",
        celular: "+56987654321",
        password: "Usuario1!",
        fechaNacimiento: "1985-05-10",
        rol: "usuario",
        token: "",
    },
    {
        email: "mgomez@gmail.com",
        nombre: "Maria Gomez",
        celular: "+56955555555",
        password: "Usuario2!",
        fechaNacimiento: "1992-12-20",
        rol: "usuario",
        token: "",
    },
];
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

// traer el nombre de la pagina actual
const pageUrl = window.location.href;
const pageName = pageUrl.split("/").pop().replace("#", "");

// verificar que la variable "usuarios" no exista en el localStorage
if (localStorage.getItem("usuarios") === null) {
    // almacenar la variable "usuarios" en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log('La variable "usuarios" ha sido almacenada en el localStorage.');
}

// obtener el elemento del menú "Mi cuenta"
const accountDropdown = document.getElementById("accountDropdown");
// obtener la sesión del usuario del localStorage
const sesionUsuario = JSON.parse(localStorage.getItem("sesionUsuario"));
// objeto de la tabla usuarios
const userTableBody = document.getElementById('userTableBody');

updateCartItemCount();

// generar el menú "Mi cuenta" dependiendo si el usuario está logueado o no
if (sesionUsuario) {
    // el usuario está logueado
    if (sesionUsuario.rol === "administrador") {
        accountDropdown.innerHTML = `
            <li><a class="dropdown-item" href="manager_user.html">Administrar usuarios</a></li>
            <li><a class="dropdown-item" href="modificar_perfil.html">Modificar mi perfil</a></li>
            <li><a class="dropdown-item" href="#" id="logoutLink">Cerrar sesión</a></li>
        `;
    } else {
        accountDropdown.innerHTML = `
            <li><a class="dropdown-item" href="modificar_perfil.html">Modificar mi perfil</a></li>
            <li><a class="dropdown-item" href="#" id="logoutLink">Cerrar sesión</a></li>
        `;
    }

    // agregar un evento de clic al enlace "Cerrar sesión"
    const logoutLink = document.getElementById("logoutLink");
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        // Borrar la sesión del usuario del localStorage
        localStorage.removeItem("sesionUsuario");
        // Redirigir al index
        window.location.href = "index.html";
    });
} else {
    // el usuario no está logueado
    accountDropdown.innerHTML = `
        <li><a class="dropdown-item" href="login.html">Iniciar sesión</a></li>
        <li><a class="dropdown-item" href="registrarme.html">Registrarse</a></li>
    `;
}

//si el usuario se enceutra logueado
if (sesionUsuario) {
    // llenar los campos del formulario de modificar perfil con los datos del usuario
    if (pageName == "modificar_perfil.html") {
        document.getElementById("nombre").value = sesionUsuario.nombre;
        document.getElementById("celular").value = sesionUsuario.celular;
        document.getElementById("fechaNacimiento").value =
            sesionUsuario.fechaNacimiento;
    }
    // llenar tabla con usuarios
    if (pageName == "manager_user.html") {
        generateUserRows();
    }
}

// funcion para generar las filas de la tabla de usuarios
function generateUserRows() {
    // obtener los usuarios del localStorage
    const usuariosJSON = localStorage.getItem('usuarios');
    const usuarios = JSON.parse(usuariosJSON);

    userTableBody.innerHTML = '';

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.email}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.celular}</td>
            <td>${usuario.fechaNacimiento}</td>
            <td>${usuario.rol}</td>
            <td>
                <button type="button" class="btn btn-primary btn-sm editUserBtn" data-bs-toggle="modal" data-bs-target="#editUserModal" data-email="${usuario.email}">Editar</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });

    // agregar un evento de clic a los botones de editar usuario
    userTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('editUserBtn')) {
            const email = event.target.dataset.email;
            const usuario = usuarios.find(usuario => usuario.email === email);

            // Llenar los campos del formulario de edición con los datos del usuario
            document.getElementById('editEmail').value = usuario.email;
            document.getElementById('editNombre').value = usuario.nombre;
            document.getElementById('editCelular').value = usuario.celular;
            document.getElementById('editFechaNacimiento').value = usuario.fechaNacimiento;
            document.getElementById('editRol').value = usuario.rol;
        }
    });
}

// funcion encargada de cargar las categorias
function loadCategories() {
    const categoryList = document.getElementById("categoryList");
    categorias.forEach((category) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = category.nombre;
        categoryList.appendChild(listItem);
    });
}

// funcion encargada de cargar los productos
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
                        <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        productList.appendChild(col);
    });

    // agregar evento de clic a los botones "Agregar al carrito"
    const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
    Array.from(addToCartButtons).forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });    
}

document.addEventListener("DOMContentLoaded", function () {
    // cargar categorias y productos en la pagina index.html
    if (pageName == "index.html") {
        loadCategories();
        loadProducts();
    }
    if (pageName === "cart.html") {
        loadCartItems();
    }
});

// funcion para validar formato de la contraseña
function validarFormatoPassword(password) {
    // expresion regular para validar el formato de la contraseña
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,15}$/;

    // validar la contraseña con la expresion regular
    if (regexPassword.test(password)) {
        return true;
    } else {
        return false;
    }
}

// funcion para validar la edad minima
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

// obtener el formulario de registro
const registroForm = document.getElementById("registroForm");
// si el formulario de registro existe
if (registroForm) {
    // agregar evento de escucha al envio del formulario y evitar el envio por defecto
    registroForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        // obtener los valores de los campos del formulario
        const email = document.getElementById("email").value;
        const nombre = document.getElementById("nombre").value;
        const celular = document.getElementById("celular").value;
        const password = document.getElementById("password").value;
        const repetirPassword = document.getElementById("repetirPassword").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const rol = "usuario";

        // validar que los campos del formulario no esten vacios
        if (
            email === "" ||
            nombre === "" ||
            celular === "" ||
            password === "" ||
            repetirPassword === "" ||
            fechaNacimiento === ""
        ) {
            alert("Por favor, completa todos los campos del formulario.");
            return;
        }

        // validar con la funcion el formato de la contraseña
        if (!validarFormatoPassword(password)) {
            alert("La contraseña debe tener entre 6 y 15 caracteres, y contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial.");
            return;
        }

        // validar que las contraseñas coincidan
        if (password !== repetirPassword) {
            alert("Las contraseñas no coinciden. Por favor, verifica nuevamente.");
            return;
        }

        // validar la edad minima 14 años
        if (!validarEdadMinima(fechaNacimiento)) {
            alert("Debes ser mayor de 14 años para registrarte.");
            return;
        }

        // obtener los usuarios del localStorage si existen
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // verificar si el usuario ya está registrado
        const usuarioExistente = usuarios.find(
            (usuario) => usuario.email === email
        );
        if (usuarioExistente) {
            alert("El usuario ya está registrado. Por favor, inicia sesión o utiliza otro correo electrónico.");
            return;
        }

        // crear un objeto de usuario con los datos del formulario
        const nuevoUsuario = {
            email: email,
            nombre: nombre,
            celular: celular,
            password: password,
            fechaNacimiento: fechaNacimiento,
            rol: rol,
            token: "",
        };

        // agregar el nuevo usuario al arreglo de usuarios y almacenarlo en el localStorage
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("¡Usuario registrado correctamente!");

        // limpiar los campos del formulario
        registroForm.reset();
    });
}

// obtener el formulario de inicio de sesión
const loginForm = document.getElementById("loginForm");
// si el formulario de inicio de sesión existe
if (loginForm) {
    // agregar un evento de escucha al envío del formulario y evitar el envío por defecto
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // obtener los valores de los campos del formulario
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        // obtener los usuarios del localStorage
        const usuariosJSON = localStorage.getItem("usuarios");
        const usuarios = JSON.parse(usuariosJSON);

        // buscar el usuario por correo electrónico y contraseña
        const usuarioEncontrado = usuarios.find(
            (usuario) =>
                usuario.email === email && usuario.password === password
        );

        if (usuarioEncontrado) {
            alert("¡Inicio de sesión exitoso!");

            // crear un nuevo objeto de usuario sin la contraseña
            const usuarioSinContraseña = {
                email: usuarioEncontrado.email,
                nombre: usuarioEncontrado.nombre,
                celular: usuarioEncontrado.celular,
                fechaNacimiento: usuarioEncontrado.fechaNacimiento,
                rol: usuarioEncontrado.rol,
            };

            // guardar la sesión del usuario en el localStorage sin la contraseña
            localStorage.setItem(
                "sesionUsuario",
                JSON.stringify(usuarioSinContraseña)
            );

            window.location.href = "index.html";
        } else {
            alert("Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.");
        }
    });
}

// Obtener el formulario de recuperación de contraseña
const recuperarForm = document.getElementById("recuperarForm");
//si el formulario de recuperación de contraseña existe
if (recuperarForm) {
    // agregar un evento de escucha al envío del formulario y evitar el envío por defecto
    recuperarForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // obtener los valores de los campos del formulario
        const recuperarEmail = document.getElementById("recuperarEmail").value;
        const token = document.getElementById("token").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        // obtener los usuarios del localStorage
        const usuariosJSON = localStorage.getItem("usuarios");

        if (usuariosJSON) {
            const usuarios = JSON.parse(usuariosJSON);

            // buscar el usuario por correo electrónico y token
            const usuario = usuarios.find(
                (usuario) =>
                    usuario.email === recuperarEmail && usuario.token === token
            );

            if (usuario) {
                // validar el formato de la nueva contraseña
                if (!validarFormatoPassword(newPassword)) {
                    alert("La contraseña debe tener entre 6 y 15 caracteres, y contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial.");
                    return;
                }

                // validar que las contraseñas coincidan
                if (newPassword !== confirmPassword) {
                    alert("Las contraseñas no coinciden. Por favor, verifica nuevamente.");
                    return;
                }

                // actualizar la contraseña del usuario y actualizar el arreglo de usuarios en el localStorage
                usuario.password = newPassword;
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                alert("La contraseña ha sido actualizada correctamente.");
                window.location.href = "login.html";
            } else {
                alert("El correo electrónico o el token ingresados no son válidos. Por favor, verifica nuevamente.");
            }
        } else {
            alert("No hay usuarios registrados.");
        }
    });
}

//funcion para generar el token de recuperación
function generarToken() {
    // obtener el valor del campo de correo electrónico
    const recuperarEmail = document.getElementById("recuperarEmail").value;
    // obtener los usuarios del localStorage
    const usuariosJSON = localStorage.getItem("usuarios");

    if (usuariosJSON) {
        const usuarios = JSON.parse(usuariosJSON);

        // buscar el usuario por correo electrónico
        const usuario = usuarios.find(
            (usuario) => usuario.email === recuperarEmail
        );

        if (usuario) {
            // generar un token aleatorio de 6 dígitos
            const token = Math.floor(Math.random() * 900000) + 100000;

            // asignar el token generado al usuario encontrado
            usuario.token = token.toString();

            // mostrar el token en una alerta
            alert("Tu token de recuperación es: " + token);

            // actualizar el arreglo de usuarios en el localStorage
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        } else {
            alert("El correo electrónico ingresado no está registrado.");
        }
    } else {
        alert("No hay usuarios registrados.");
    }
}

// obtener los formularios de modificar perfil y modificar contraseña
const modificarPerfilForm = document.getElementById("modificarPerfilForm");
const modificarContraseñaForm = document.getElementById(
    "modificarContraseñaForm"
);

// manejar el envío del formulario de modificar perfil
if (modificarPerfilForm) {
    // crear un evento de escucha al envío del formulario y evitar el envío por defecto
    modificarPerfilForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // obtener los usuarios del localStorage
        const usuariosJSON = localStorage.getItem("usuarios");
        const usuarios = JSON.parse(usuariosJSON);

        // obtener los valores de los campos del formulario
        const nombre = document.getElementById("nombre").value;
        const celular = document.getElementById("celular").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;

        // buscar el usuario por correo electrónico y actualizar sus datos
        usuarios.forEach((usuario) => {
            if (usuario.email === sesionUsuario.email) {
                usuario.nombre = nombre;
                usuario.celular = celular;
                usuario.fechaNacimiento = fechaNacimiento;
            }
        });

        // actualizar el arreglo de usuarios en el localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // actualizar la sesión del usuario en el localStorage
        sesionUsuario.nombre = nombre;
        sesionUsuario.celular = celular;
        sesionUsuario.fechaNacimiento = fechaNacimiento;
        localStorage.setItem("sesionUsuario", JSON.stringify(sesionUsuario));

        alert("Información personal actualizada correctamente.");
    });
}

// manejar el envío del formulario de modificar contraseña
if (modificarContraseñaForm) {
    // crear un evento de escucha al envío del formulario y evitar el envío por defecto
    modificarContraseñaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // obtener los usuarios del localStorage
        const usuariosJSON = localStorage.getItem("usuarios");
        const usuarios = JSON.parse(usuariosJSON);

        // obtener los valores de los campos del formulario
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // validar que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden. Por favor, verifica nuevamente.");
            return;
        }

        // validar el formato de la nueva contraseña
        if (!validarFormatoPassword(newPassword)) {
            alert("La contraseña debe tener entre 6 y 15 caracteres, y contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial.");
            return;
        }

        // buscar el usuario por correo electrónico y actualizar su contraseña
        usuarios.forEach((usuario) => {
            if (usuario.email === sesionUsuario.email) {
                usuario.password = newPassword;
            }
        });

        // actualizar el arreglo de usuarios en el localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Contraseña actualizada correctamente.");
    });
}

// manejar el clic en el botón "Guardar cambios" del modal de edición de administrar usuarios
const saveChangesBtn = document.getElementById('saveChangesBtn');
if (saveChangesBtn) {
    // agregar un evento de clic al botón "Guardar cambios"
    saveChangesBtn.addEventListener('click', function() {
        const email = document.getElementById('editEmail').value;
        const nombre = document.getElementById('editNombre').value;
        const celular = document.getElementById('editCelular').value;
        const fechaNacimiento = document.getElementById('editFechaNacimiento').value;
        const rol = document.getElementById('editRol').value;
    
        // obtener los usuarios del localStorage
        const usuariosJSON = localStorage.getItem("usuarios");
        const usuarios = JSON.parse(usuariosJSON);
    
        // actualizar los datos del usuario en el arreglo de usuarios
        usuarios.forEach(usuario => {
            if (usuario.email === email) {
                usuario.nombre = nombre;
                usuario.celular = celular;
                usuario.fechaNacimiento = fechaNacimiento;
                usuario.rol = rol;
            }
        });
    
        // actualizar el arreglo de usuarios en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
        // cerrar el modal de edición
        const editUserModal = document.getElementById('editUserModal');
        const modal = bootstrap.Modal.getInstance(editUserModal);
        modal.hide();
    
        location.reload();
    });    
}

// obtener el formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // agregar un evento de escucha al envío del formulario y evitar el envío por defecto
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        // Validar que todos los campos estén completos
        if (nombre === '' || email === '' || celular === '' || asunto === '' || mensaje === '') {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }

        alert('¡Mensaje enviado correctamente!');
        contactForm.reset();
    });
}

// función para agregar un producto al carrito de compras
function addToCart(productId) {
    // obtener el carrito de compras del localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // buscar el producto en el arreglo de productos
    const product = productos.find(producto => producto.id === productId);

    if (product) {
        // verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // si el producto ya está en el carrito, aumentar la cantidad
            existingProduct.cantidad++;
        } else {
            // si el producto no está en el carrito, agregarlo con cantidad 1
            const cartItem = {
                id: product.id,
                nombre: product.nombre,
                descripcion: product.descripcion,
                imagen: product.imagen,
                precio: product.precio,
                categoria: product.categoria,
                cantidad: 1
            };
            cart.push(cartItem);
        }

        // actualizar el carrito de compras en el localStorage y actualizar la vista
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartItemCount();

        alert('Producto agregado al carrito');
    }
}

// función para actualizar el contador de elementos en el carrito
function updateCartItemCount() {
    const cartItemCount = document.getElementById('cartItemCount');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.cantidad;
    });

    cartItemCount.textContent = totalQuantity;
}
// función para cargar los elementos del carrito
function loadCartItems() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cartTotal = document.getElementById('cartTotal');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartTableBody.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="assets/img/productos/${item.imagen}" alt="${item.nombre}" width="50">
                ${item.nombre}
            </td>
            <td>$${item.precio}</td>
            <td>
                <input type="number" class="form-control cantidad-input" value="${item.cantidad}" min="1" data-id="${item.id}">
            </td>
            <td>$${item.precio * item.cantidad}</td>
            <td>
                <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        cartTableBody.appendChild(row);

        total += item.precio * item.cantidad;
    });

    cartTotal.textContent = total;

    // agregar evento de cambio a los inputs de cantidad
    const cantidadInputs = document.getElementsByClassName('cantidad-input');
    Array.from(cantidadInputs).forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const cantidad = parseInt(this.value);
            updateCartItemQuantity(productId, cantidad);
            updateCartItemCount();
        });
    });

    // agregar evento de clic a los botones de eliminar
    const eliminarButtons = document.getElementsByClassName('eliminar-btn');
    Array.from(eliminarButtons).forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeCartItem(productId);
        });
    });
}

// funcion para actualizar la cantidad de un producto en el carrito
function updateCartItemQuantity(productId, cantidad) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.cantidad = cantidad;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
}

// funcion para eliminar un producto del carrito
function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCartItems();
    updateCartItemCount();
}