const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const rol = (req, res) => {
  const cookieJWT = req.headers.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="))
    .slice(4);
  console.log("COOKIE", cookieJWT);
  const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET_KEY);
  console.log("DECODIFICADA", decodificada.rol);

  if (decodificada.rol == "admin") {
    res.render("../src/view/homeAdmin");
  } else {
    res.render("../src/view/home");
  }
};

module.exports = rol;
