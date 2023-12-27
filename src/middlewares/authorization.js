const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const connection = require("../controllers/connectionData");

app.use(cookieParser());

function accesoPublico(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado == true) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    console.log("COOKIE", cookieJWT);
    const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET_KEY);
    console.log("DECODIFICADA", decodificada.rol);
    if (!decodificada) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

module.exports = { accesoPublico: accesoPublico, revisarCookie: revisarCookie };
