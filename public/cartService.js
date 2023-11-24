/* MEMORIA CARRITO */
function agregarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("productos"));
  let cantidadProductoFinal;
  if (!memoria) {
    const nuevoProducto = getproducto(producto);
    localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
    cantidadProductoFinal = 1;
  } else {
    const indiceProducto = memoria.findIndex((item) => item.id === producto.id);
    const nuevaMemoria = memoria;
    if (indiceProducto === -1) {
      const nuevoProducto = getproducto(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
    return cantidadProductoFinal;
  }
}

/** RESTA PRODUCTO DE CARRITO */
function restarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem("productos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex((item) => item.id === producto.id);
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if (cantidadProductoFinal === 0) {
    nuevaMemoria.splice(indiceProducto, 1);
  }
  localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
  return cantidadProductoFinal;
}

/**AGREGAR PRODUCTO */
function getproducto(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** CARGAR CARRITO */
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const productosEnCarrito = JSON.parse(localStorage.getItem("productos"));
const cantidadElement = document.querySelector("cantidad");
const precioElement = document.getElementById("precio-total");
const contenedorTotal = document.querySelector("#Total");

function cargarProductosCarrito() {
  contenedorCarritoProductos.innerHTML = "";

  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

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
                    <div> <button> <i class="fa-solid fa-minus "></i> </button> 
                      <span class="cantidad">${producto.cantidad}</span>
                    <button> <i class="fa-solid fa-plus"></i> </button></div>
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

      contenedorCarritoProductos.appendChild(div);

      div.getElementsByTagName("button")[0].addEventListener("click", (e) => {
        e.preventDefault();
        restarAlCarrito(producto);
        cargarProductosCarrito();
        actualizarTotal();
      });

      div.getElementsByTagName("button")[1].addEventListener("click", (e) => {
        e.preventDefault();
        const cantidadElement =
          e.target.parentElement.getElementsByTagName("span")[0];
        cantidadElement.innerHTML = agregarAlCarrito(producto);
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

/**ACTUALIZA MONTO TOTAL CARRITO*/
function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  contenedorTotal.innerText = `$${totalCalculado}`;
}

/** VACIAR CARRITO */

function reiniciarCarrito() {
  localStorage.removeItem("productos");
}
document
  .getElementById("carrito-acciones-vaciar")
  .addEventListener("click", () => {
    contenedorCarritoProductos.innerHTML = "";
    reiniciarCarrito();
  });

cargarProductosCarrito();
