let navButton = document.querySelector(".button-menu");
let navMenu = document.querySelector(".nav-link");

navButton.addEventListener("click", () => {
  navMenu.classList.toggle("nav-link_visible");
});
/*FUNCION DESLOGUEARSE*/

function logout() {
  const logout = document.getElementsByClassName("logout")[0];
  logout.addEventListener("click", () => {
    document.cookie = "jwt=; Path=/; Expires= Thu, 01 Jan 1900 00:00:01 GMT;";
    document.location.href = "/login";
  });
}
logout();

/*CARGA TARJETAS PRODUCTOS*/
async function getProductos() {
  const res = await fetch("http://localhost:3000/cargaProductos");
  const resJson = await res.json();
  return resJson;
}
const contenedorTarjeta = document.getElementById("productos-container");
const searchInput = document.getElementById("searchInput");

function crearTarjetaProductos(products) {
  contenedorTarjeta.innerHTML = "";
  if (products.length == 0) {
    noResults.style.display = "block";
  } else {
    products.forEach((producto) => {
      const nuevoProducto = document.createElement("article");
      nuevoProducto.classList = "tarjeta-producto";
      nuevoProducto.innerHTML = `
      <img src="./Imagenes/${producto.id}.jpg">
      <h3 class="textoCarpa">${producto.name}</h3>  
      <p><strong>$${producto.price}</strong></p>
      <button> Agregar al carrito</button>
      `;
      contenedorTarjeta.appendChild(nuevoProducto);
      nuevoProducto
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => agregarAlCarrito(producto));
    });
    noResults.style.display = "none";
  }
}

const Search = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filterProducts = baseDatosProductos.filter((product) =>
    product.nombre.toLowerCase().startsWith(searchTerm)
  );

  crearTarjetaProductos(filterProducts);
};

// crearTarjetaProductos(product);

searchInput.addEventListener("input", Search);

getProductos().then((productList) => {
  crearTarjetaProductos(productList);
});
