const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
    res.render("../src/view/home");
  });

  router.get("/login", (req, res) => {
    res.render("../src/view/login");
  });
    
  router.get("/PRODUCTOS", (req, res) => {
    res.render("../src/view/PRODUCTS");
  });
  
  router.get("/DETALLE", (req, res) => {
    res.render("../src/view/DETAIL");
  });

  router.get("/register", (req, res) =>{
    res.render("../src/view/REGISTER")
});

module.exports = router;
