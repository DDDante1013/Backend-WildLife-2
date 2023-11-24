const connection = require("./connectionData");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const createUsers = async (req, res) => {
  let nombre = req.body.firstName;
  let apellido = req.body.lastName;
  let usuario = req.body.userName;
  let hashPassword = bcrypt.hashSync(req.body.password, salt);
  console.log(hashPassword);
  let email = req.body.email;

  let registerUser =
    "INSERT INTO users ( name, lastname, username, email, password) VALUES ('" +
    nombre +
    "','" +
    apellido +
    "', '" +
    usuario +
    "','" +
    email +
    "','" +
    hashPassword +
    "')";
  connection.query(registerUser, async (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render("../src/view/register", {
        alert: true,
        alertTitle: "Registration",
        alerMessage: "Registro Creado con exito",
        alerIcon: "success",
        showConfirmButton: false,
        timer: 5500,
        ruta: "login",
      });
    }
  });
};

module.exports = createUsers;
