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
  let nacimiento = req.body.nacimiento;
  console.log("BORN", nacimiento);
  const rol = "user";
  dataUsers = req.body;
  console.log(dataUsers);
  let registerUser =
    "INSERT INTO users ( name, lastname, username, email, born, password,rol) VALUES ('" +
    nombre +
    "','" +
    apellido +
    "', '" +
    usuario +
    "','" +
    email +
    "','" +
    nacimiento +
    "','" +
    hashPassword +
    "','" +
    rol +
    "')";
  connection.query(registerUser, (error, results) => {
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
