/*=========================================
        VARIABLES GLOBALES
=========================================*/
const contenedorProductos = document.getElementById("productos-container");
const contadorCarrito = document.getElementById("contador-carrito");
let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
/*========================================
        CARGAR PRODUCTOS
=========================================*/
async function cargarProductos() {

    try {

        const urls = [

            "https://dummyjson.com/products/category/smartphones",

            "https://dummyjson.com/products/category/laptops",

            "https://dummyjson.com/products/category/tablets",

            "https://dummyjson.com/products/category/mobile-accessories"

        ];

        const respuestas = await Promise.all(

            urls.map(url => fetch(url))

        );

        const datos = await Promise.all(

            respuestas.map(respuesta => respuesta.json())

        );

        productos = [];

        datos.forEach(categoria => {

            productos.push(...categoria.products);

        });

        mostrarProductos(productos);

    } catch (error) {

        contenedorProductos.innerHTML =
            "<h3>No fue posible cargar los productos.</h3>";

        console.error(error);

    }

}
/*=========================================
        MOSTRAR PRODUCTOS
=========================================*/
function mostrarProductos(listaProductos) {
    contenedorProductos.innerHTML = "";
    listaProductos.forEach(producto => {
        const card = document.createElement("article");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p>
                ${producto.description.substring(0,80)}...
            </p>
            <h4>$${producto.price}</h4>
            <button
                class="btn-agregar"
                data-id="${producto.id}">
                Agregar al carrito
            </button>
        `;
        contenedorProductos.appendChild(card);
    });
    activarBotones();
}
/*=========================================
        BOTONES
=========================================*/
function activarBotones() {

    const botones = document.querySelectorAll(".btn-agregar");

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);

            agregarAlCarrito(id);

        });

    });
}
/*=========================================
        CONTADOR
=========================================*/
function actualizarContador() {
    let cantidad = 0;
    carrito.forEach(producto => {

        cantidad += producto.cantidad;
    });
    contadorCarrito.textContent = cantidad;
}
/*=========================================
        INICIO
=========================================*/

/*=========================================
        AGREGAR AL CARRITO
=========================================*/

function agregarAlCarrito(id) {
    // Buscar el producto en la lista obtenida desde la API
    const producto = productos.find(p => p.id === id);
    // Verificar si ya existe en el carrito
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.title,
            price: producto.price,
            image: producto.thumbnail,
            cantidad: 1
        });
    }
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
    alert("Producto agregado al carrito.");
}
/*=========================================
        LOCAL STORAGE
=========================================*/
function guardarCarrito() {
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}
/*=========================================
        RECUPERAR CARRITO
=========================================*/
function cargarCarrito() {
    carrito = JSON.parse(
        localStorage.getItem("carrito")
    ) || [];
    actualizarContador();
    mostrarCarrito();
}
/*=========================================
        MOSTRAR CARRITO
=========================================*/
const listaCarrito = document.getElementById("lista-carrito");
const totalCompra = document.getElementById("total");
function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <p style="text-align:center;">
                El carrito está vacío.
            </p>
        `;
        totalCompra.textContent = "0.00";
        return;
    }
    carrito.forEach(producto => {
        total += producto.price * producto.cantidad;
        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <div class="item-info">
                <h4>${producto.title}</h4>
                <p>$${producto.price}</p>
            </div>
            <div class="item-controles">
                <button onclick="restarCantidad(${producto.id})">−</button>
                <span>${producto.cantidad}</span>
                <button onclick="sumarCantidad(${producto.id})">+</button>
                <button onclick="eliminarProducto(${producto.id})">
                    🗑
                </button>
            </div>
        `;
        listaCarrito.appendChild(item);
    });
    totalCompra.textContent = total.toFixed(2);
}
/*=========================================
        SUMAR CANTIDAD
=========================================*/
function sumarCantidad(id){
    const producto = carrito.find(item => item.id === id);
    producto.cantidad++;
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
}
/*=========================================
        RESTAR CANTIDAD
=========================================*/
function restarCantidad(id){
    const producto = carrito.find(item => item.id === id);
    producto.cantidad--;
    if(producto.cantidad <= 0){
        carrito = carrito.filter(item => item.id !== id);
    }
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
}
/*=========================================
        ELIMINAR PRODUCTO
=========================================*/
function eliminarProducto(id){
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
}
/*=========================================
        VACIAR CARRITO
=========================================*/
const botonVaciar = document.getElementById("vaciar-carrito");
botonVaciar.addEventListener("click",()=>{
    if(carrito.length===0){
        alert("El carrito ya está vacío.");
        return;
    }
    carrito=[];
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
    alert("Carrito vaciado.");
});
/*=========================================
        FINALIZAR COMPRA
=========================================*/
const botonFinalizar = document.getElementById("finalizar-compra");
botonFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("¡Gracias por tu compra! Tu pedido fue registrado correctamente.");
    carrito = [];
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
});
/*=========================================
        VALIDACIÓN DEL FORMULARIO
=========================================*/
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (event) {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (nombre === "") {
        event.preventDefault();
        alert("Ingrese su nombre.");
        return;
    }
    if (!expresionCorreo.test(email)) {
        event.preventDefault();
        alert("Ingrese un correo electrónico válido.");
        return;
    }
    if (mensaje.length < 10) {
        event.preventDefault();
        alert("El mensaje debe tener al menos 10 caracteres.");
        return;
    }
    alert("Mensaje enviado correctamente.");
});
/*=========================================
        CARGA INICIAL
=========================================*/

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCarrito();
});
const slider = document.getElementById("slider");


setInterval(()=>{


    slider.scrollLeft += 280;


    if(slider.scrollLeft >= slider.scrollWidth - slider.clientWidth){

        slider.scrollLeft = 0;

    }


},2000);