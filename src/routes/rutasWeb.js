const express = require("express");
const router = express.Router();
const {
  accesoPublico,
  revisarCookie,
} = require("../middlewares/authorization");
const {
  cargaProducts,
  cargaunProduct,
  deleteProduct,
  editProduct,
  update,
} = require("../controllers/crudProductos");
const { deleteUser } = require("../controllers/crudUser");
const rol = require("../middlewares/rol");

const connection = require("../controllers/connectionData");

router.get("/login", (req, res) => {
  res.render("../src/view/login");
});

router.get("/contacto", (req, res) => {
  res.render("../src/view/formularioContacto");
});

router.get("/contactologuin", (req, res) => {
  res.render("../src/view/Contactologueado");
});

router.get("/home", accesoPublico, rol);

router.get("/productos", (req, res) => {
  res.render("../src/view/products");
});

router.get("/detalle", accesoPublico, (req, res) => {
  res.render("../src/view/detail");
});

router.get("/carrito", accesoPublico, (req, res) => {
  res.render("../src/view/carrito");
});

router.get("/register", (req, res) => {
  res.render("../src/view/REGISTER");
});
router.get("/order", accesoPublico, (req, res) => {
  res.render("../src/view/order");
});

/* RUTAS PARA EL ADMIN */
router.get("/cargaUsuarios", async (req, res) => {
  const result = await connection.query("SELECT * FROM users");
  res.json(result);
});

router.get("/gestorUsuarios", (req, res) => {
  res.render("../src/view/userAdmin");
});
router.get("/deleteUser/:id_user", deleteUser);

router.get("/gestorProductos", (req, res) => {
  res.render("../src/view/productAdmin");
});
router.get("/delete/:id", deleteProduct);

router.get("/update/:id", editProduct);
router.post("/update/:id", update);

router.get("/cargaProductos", async (req, res) => {
  const result = await connection.query("SELECT * FROM product");
  res.json(result);
});

router.get("/gestorProductos/:id", cargaunProduct);

module.exports = router;
