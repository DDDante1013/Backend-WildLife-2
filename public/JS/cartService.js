/** MEMORIA CARRITO */
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
                    <h3>${producto.name}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <div> <button class="btn-restar" id="${
                      producto.id
                    }"> <i class="fa-solid fa-minus "></i> </button> 
                      <span class="cantidad">${producto.cantidad}</span>
                    <button class="btn-sumar" id="${
                      producto.id
                    }"> <i class="fa-solid fa-plus"></i> </button></div>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.price}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.price * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${
                  producto.id
                }"><i class="fa-solid fa-trash"></i></button>
            `;

      contenedorCarritoProductos.appendChild(div);
    });
    actualizarBotonMenos();
    actualizarBotonMas();
    actualizarBotonesEliminar();
    actualizarTotal();
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
}

cargarProductosCarrito();

/**ACTUALIZA MONTO TOTAL CARRITO*/
function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.price * producto.cantidad,
    0
  );
  contenedorTotal.innerText = `$${totalCalculado}`;
}
/**ARRAY DE CARRTIO */
let arrayproductosEnCarrito;
let arrayproductosEnCarritos = localStorage.getItem("productos");
if (arrayproductosEnCarritos) {
  arrayproductosEnCarrito = JSON.parse(arrayproductosEnCarritos);
} else {
  arrayproductosEnCarrito = [];
}
console.log("ARRAY PRODUCTOS EN CARRITO", arrayproductosEnCarrito); //console.log

/** RESTA PRODUCTO DE CARRITO */
function restarAlCarrito(e) {
  let cantidadProductoFinal = 0;
  const idBoton = e.currentTarget.id;

  const index = productosEnCarrito.findIndex((producto) => {
    return producto.id == idBoton;
  });
  console.log("SOY INDEX", index);
  cantidadProductoFinal = productosEnCarrito[index].cantidad--;
  if (cantidadProductoFinal === 0) {
    productosEnCarrito.splice(index, 1);
  }
  localStorage.setItem("productos", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();
  // return cantidadProductoFinal;
}
function actualizarBotonMenos() {
  botonMenos = document.querySelectorAll(".btn-restar");
  botonMenos.forEach((botonMenos) => {
    botonMenos.addEventListener("click", restarAlCarrito);
  });
}

/**SUMAR AL CARRITO */

function sumarAlCarrito(e) {
  let cantidadProductoFinal = 0;
  const idBoton = e.currentTarget.id;

  const index = productosEnCarrito.findIndex((producto) => {
    return producto.id == idBoton;
  });
  // console.log("SOY INDEX", index);
  cantidadProductoFinal = productosEnCarrito[index].cantidad++;
  localStorage.setItem("productos", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();
}
function actualizarBotonMas() {
  botonMas = document.querySelectorAll(".btn-sumar");
  botonMas.forEach((botonMas) => {
    botonMas.addEventListener("click", sumarAlCarrito);
  });
}
/**ELIMINAR DEL CARRITO */

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoEliminado = arrayproductosEnCarrito.find((producto) => {
    return producto.id == idBoton;
  });
  console.log(idBoton); // console log
  console.log(productoEliminado); //console.log

  const index = productosEnCarrito.findIndex((producto) => {
    return producto.id == idBoton;
  });
  productosEnCarrito.splice(index, 1);

  localStorage.setItem("productos", JSON.stringify(productosEnCarrito));
  cargarProductosCarrito();
}
/** COMPRAR CARRITO */
const botonComprar = document.querySelector("#carrito-acciones-comprar");
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem("productos", JSON.stringify(productosEnCarrito));

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");
}

/** VACIAR CARRITO */

const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
botonVaciar.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("productos");

  contenedorCarritoProductos.innerHTML = "";
  contenedorCarritoVacio.classList.remove("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.add("disabled");
}
