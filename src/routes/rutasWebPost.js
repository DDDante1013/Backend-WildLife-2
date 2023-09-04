const express = require("express");
const router = express.Router();
const read =require("../controllers/read");
const writeJSON = require("../controllers/write");
const {registerCheck} = require("../controllers/registerCheck");


router.post("/register", registerCheck, (req, res) => {
    let oldJSON = read();
    const newUser = {
      id: oldJSON.length + 1,
      nombre: req.body.firstName,
      apellido: req.body.lastName,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
      email: req.body.email,
      telefono: req.body.phoneNumber,
      nacionalidad: req.body.nacionalidad,
      nacimiento: req.body.nacimiento,
    };
    oldJSON.push(newUser);
    writeJSON(oldJSON);
    res.sendStatus(200);
  });

router.post("/login", (req, res) => {
  const body = req.body;
  console.log(body);
});

module.exports = router;