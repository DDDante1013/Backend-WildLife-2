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

// const productos = [
//   {
//     id: 0,
//     nombre: "Carpa Iglu para 4 personas",
//     img: "https://github.com/DDDante1013/Backend-WildLife-2/blob/cc7e84312c37c9dc527c28927bf70f0e2df57bde/public/Imagenes/CARPAIGLU",
//     precio: 135.0,
//   },
//   {
//     id: 1,
//     nombre: "Carpa Canadiense para 2 personas",
//     img: "https://github.com/DDDante1013/Backend-WildLife-2/blob/cc7e84312c37c9dc527c28927bf70f0e2df57bde/public/Imagenes/public/imagenes/CARPACANADIENSE",
//     precio: 35.0,
//   },
//   {
//     id: 2,
//     nombre: "Carpa BIKE PRO 2 - Northland",
//     img: "https://github.com/DDDante1013/Backend-WildLife-2/blob/cc7e84312c37c9dc527c28927bf70f0e2df57bde/public/Imagenes/public/imagenes/carpa1",
//     precio: 99.0,
//   },
//   {
//     id: 3,
//     nombre: "Carpa BIKE PRO 2 - Northland",
//     img: "https://github.com/DDDante1013/Backend-WildLife-2/blob/cc7e84312c37c9dc527c28927bf70f0e2df57bde/public/Imagenes/public/imagenes/CARPACANADIENSE",
//     precio: 99.0,
//   },
//   {
//     id: 4,
//     nombre: "Carpa BIKE PRO 2 - Northland",
//     img: "https://github.com/DDDante1013/Backend-WildLife-2/blob/cc7e84312c37c9dc527c28927bf70f0e2df57bde/public/Imagenes/public/imagenes/CARPACANADIENSE",
//     precio: 99.0,
//   },
// ];

const contenedorTarjeta = document.getElementById("productos-container");

function crearTarjetaProductos(product) {
  product.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "tarjeta-producto";
    nuevoProducto.innerHTML = `
    <img src="https://github.com/DDDante1013/Backend-WildLife-2/blob/cc7e84312c37c9dc527c28927bf70f0e2df57bde/public/Imagenes/${producto.id}.jpg">
    <h3>${producto.nombre}</h3>  
    <p>$${producto.precio}</p>
    <button> Agregar al carrito</button>
    `;
    contenedorTarjeta.appendChild(nuevoProducto);
  });
}

crearTarjetaProductos(productos);
