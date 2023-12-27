const express = require("express");
const app = express();
const router = express.Router();
const { registerCheck } = require("../controllers/registerCheck");
const createUsers = require("../controllers/createUsers");
const confirmedUser = require("../controllers/confirmedUser");
const { createProduct } = require("../controllers/crudProductos");
const { createUserAdmin } = require("../controllers/crudUser");
const connection = require("../controllers/connectionData");

router.post("/register", registerCheck, createUsers);
router.post("/login", confirmedUser);
router.post("/addProduct", createProduct);
router.post("/addUser", createUserAdmin);
router.post("/contact", (req, res) => {
  res.render("../src/view/register", {
    alert: true,
    alertTitle: "¡Gracias por contactarnos!",
    alerMessage: "Su Consulta fue enviada, pronto recibira respuesta. ",
    alerIcon: "success",
    showConfirmButton: false,
    timer: 5500,
    ruta: "login",
  });
});

router.post("/contactLoguin", (req, res) => {
  res.render("../src/view/Contactologueado", {
    alert: true,
    alertTitle: "¡Gracias por contactarnos!",
    alerMessage: "Su Consulta fue enviada, pronto recibira respuesta. ",
    alerIcon: "success",
    showConfirmButton: false,
    timer: 5500,
    ruta: "home",
  });
});

module.exports = router;
