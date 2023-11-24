const express = require("express");
const router = express.Router();
const {
  accesoPublico,
  revisarCookie,
} = require("../middlewares/authorization");

const connection = require("../controllers/connectionData");

//
// const { Sequelize, Model, DataTypes } = require("sequelize");

// const sequelize = new Sequelize("mydb", "root", "Luci3006ddd@", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
// });

router.get("/login", (req, res) => {
  res.render("../src/view/login");
});

router.get("/home", accesoPublico, (req, res) => {
  res.render("../src/view/home");
});

// router.get("/productos", accesoPublico, (req, res) => {
//   res.render("../src/view/products");
// });

router.get("/productos", accesoPublico, (req, res) => {
  // const result = await connection.query("SELECT * FROM product");
  // console.log(result);
  // res.json(result);
  res.render("../src/view/productAdmin");
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

module.exports = router;
