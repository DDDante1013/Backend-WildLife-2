let navButton = document.querySelector(".button-menu");
let navMenu = document.querySelector(".nav-link");

navButton.addEventListener("click", () => {
  navMenu.classList.toggle("nav-link_visible");
});

function logout() {
  const logout = document.getElementsByClassName("logout")[0];
  logout.addEventListener("click", () => {
    document.cookie = "jwt=; Path=/; Expires= Thu, 01 Jan 1900 00:00:01 GMT;";
    document.location.href = "/login";
  });
}
logout();

const contenedorTarjeta = document.getElementById("productos-container");

function crearTarjetaProductos(product) {
  product.forEach((producto) => {
    const nuevoProducto = document.createElement("article");
    nuevoProducto.classList = "tarjeta-producto";
    nuevoProducto.innerHTML = `
    <img src="./Imagenes/${producto.id}.jpg">
    <h3 class="textoCarpa">${producto.nombre}</h3>  
    <p><strong>$${producto.precio}</strong></p>
    <button> Agregar al carrito</button>
    `;
    contenedorTarjeta.appendChild(nuevoProducto);
    nuevoProducto
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}

crearTarjetaProductos(baseDatosProductos);
