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
    loadCategories();
    loadProducts();
});
