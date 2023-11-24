const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const productosEnCarrito = JSON.parse(localStorage.getItem("productos"));
const cantidadElement = document.getElementsByClassName(
  "carrito-producto-cantidad"
);
const precioElement = document.getElementById("precio-total");
const contenedorTotal = document.querySelector("#Total");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
      <img class="carrito-producto-imagen" src="./Imagenes/${producto.id}.jpg">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p> <button> <i class="fa-solid fa-minus "></i> </button> 
                      <span class="cantidad">${producto.cantidad}</span>
                    <button> <i class="fa-solid fa-plus"></i> </button></p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${
                  producto.id
                }"><i class="fa-solid fa-trash"></i></button>
            `;

      contenedorCarritoProductos.append(div);

      div.getElementsByTagName("button")[0].addEventListener("click", (e) => {
        const cantidadElement =
          e.target.parentElement.getElementsByTagName("span")[0];
        cantidadElement.innerText = restarAlCarrito(producto);
        cargarProductosCarrito();
        actualizarTotal();
      });

      div.getElementsByTagName("button")[1].addEventListener("click", (e) => {
        const cantidadElement =
          e.target.parentElement.getElementsByClassName("cantidad")[0];
        cantidadElement.innerText = agregarAlCarrito(producto);
        actualizarTotal();
        cargarProductosCarrito();
      });
    });

    actualizarTotal();
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
  actualizarTotal();
}

cargarProductosCarrito();

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  contenedorTotal.innerText = `$${totalCalculado}`;
}
