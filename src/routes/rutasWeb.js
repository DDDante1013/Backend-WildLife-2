const express = require("express");
const router = express.Router();
const {accesoPublico, revisarCookie} = require("../middlewares/authorization");



router.get("/login", (req, res) => {
    res.render("../src/view/login");
  });

  router.get("/home", accesoPublico, (req, res) => {
    res.render("../src/view/home");
  });    
  
router.get("/productos", accesoPublico, (req, res) => {
    res.render("../src/view/products");
  });
  
  router.get("/detalle",accesoPublico,  (req, res) => {
    res.render("../src/view/detail");
  });

  router.get("/carrito",accesoPublico,  (req, res) => {
    res.render("../src/view/carrito");
  });

  router.get("/register", (req, res) =>{
    res.render("../src/view/REGISTER")
});

module.exports = router;
