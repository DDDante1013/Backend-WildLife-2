const express = require("express");
const app = express();
const read = require("./read");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

app.use(cookieParser());

const confirmedPassword = (req, res) => {
  let userdata = read();

  const userName = req.body.userName;
  const password = req.body.password;

  let baseData = userdata.find((user) => user.usuario == userName);
// console.log(userName);
// console.log(password);
//   console.log(baseData);

  if (!userName || !password) {
    res.redirect("/login");
    // return res.send({
    //   status: "Error",
    //   message: "Los campos están incompletos",
    //   redirect: "login",
    // });
  }
  if (baseData === undefined) {
    return res.render("../src/view/login", {
      message: "Ingrese usuario y contraseña",
    });
  } else {
    let baseData = userdata.find((user) => user.usuario == userName);
    let usuario = baseData.usuario;

    if (userName === usuario) {
      try {
        let hashPassword = baseData.hashPassword;
        let confirmedPassword = bcrypt.compareSync(password, hashPassword);
        if (confirmedPassword == true) {
          const tokenPayload = {
            user: baseData.usuario,
            firstName: baseData.nombre,
            email: baseData.email,
          };
          const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET_KEY,
            {expiresIn:process.env.JWT_EXPIRATION});

          const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/",
          };
          return res.cookie("jwt", token, cookieOption).redirect("/home");
        } else {
          return res.render("../src/view/login", {
            message: "datos incorrectos",
          });
        }
      } catch {
        res.render("../src/view/login", {
          message: "por favor asegurese de que los datos sean correctos",
        });
      }
    }
  }
};

module.exports = confirmedPassword;
