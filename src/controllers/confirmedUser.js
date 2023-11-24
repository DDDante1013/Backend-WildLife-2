const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const connection = require("./connectionData");

app.use(cookieParser());

const confirmedPassword = async (req, res) => {
  const userName = req.body.userName;

  const password = req.body.password;
  console.log(password);
  let hashpassword = bcrypt.hashSync(password, salt);

  if (!userName || !password) {
    res.render("../src/view/login", {
      alert: true,
      alertTitle: "Advertencia",
      alerMessage: "¡Por favor inrese un usuario y/o contraseña!",
      alerIcon: "warning",
      showConfirmButton: true,
      timer: 10000,
      ruta: "login",
    });
  }
  if (userName && password) {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [userName],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          res.render("../src/view/login", {
            alert: true,
            alertTitle: "Error",
            alerMessage: "Usuario y/o contraseña incorrectos",
            alerIcon: "error",
            showConfirmButton: true,
            timer: 10000,
            ruta: "login",
          });
        } else {
          const tokenPayload = {
            user: results[0].username,
            firstName: results[0].name,
            lastName: results[0].lastname,
            email: results[0].email,
          };
          const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRATION,
          });

          const cookieOption = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            path: "/",
          };
          return res.cookie("jwt", token, cookieOption).redirect("/home");
        }
      }
    );
  }
};

// if (baseData === undefined) {
//   return res.render("../src/view/login", {
//     message: "Ingrese usuario y contraseña",
//   });
// } else {
//   // let baseData = userdata.find((user) => user.usuario == userName);
//   // let usuario = baseData.usuario;
//   const seleccionar = "SELECT * from users where username = userName";
//   let usuario = await connection.query(seleccionar);

//   if (userName === usuario) {
//     try {
//       let hashPassword = baseData.hashPassword;
//       let confirmedPassword = bcrypt.compareSync(password, hashPassword);
//       if (confirmedPassword == true) {
//         const tokenPayload = {
//           user: baseData.usuario,
//           firstName: baseData.nombre,
//           email: baseData.email,
//         };
//         const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
//           expiresIn: process.env.JWT_EXPIRATION,
//         });

//         const cookieOption = {
//           expires: new Date(
//             Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//           ),
//           path: "/",
//         };
//         return res.cookie("jwt", token, cookieOption).redirect("/home");
//       } else {
//         return res.render("../src/view/login", {
//           message: "datos incorrectos",
//         });
//       }
//     } catch {
//       res.render("../src/view/login", {
//         message: "por favor asegurese de que los datos sean correctos",
//       });
//     }
//   }
// }
// };

module.exports = confirmedPassword;
