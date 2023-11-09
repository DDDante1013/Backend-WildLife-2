const navButton = document.querySelector(".button-menu");
const navMenu = document.querySelector(".nav-link");

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
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "tarjeta-producto";
    contenedorTarjeta.appendChild(nuevoProducto);
  });
}

crearTarjetaProductos(productos);
