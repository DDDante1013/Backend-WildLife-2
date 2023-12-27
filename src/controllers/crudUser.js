const connection = require("./connectionData");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const cargaUsuarios = async (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.json(error);
    } else {
      // connection.query("ALTER TABLE product")
      return res.send(results);
      // res.render("../src/view/productAdmin");
    }
  });
};
const cargaunUsuario = async (req, res) => {
  connection.query(
    "SELECT * FROM product WHERE id_user =?",
    [req.params.id],
    (err, fila) => {
      if (err) {
        throw err;
      } else {
        res.send(fila);
        // res.render("../src/view/productAdmin", { data: fila });
      }
    }
  );
};

const createUserAdmin = (req, res) => {
  let nombre = req.body.firstName;
  let apellido = req.body.lastName;
  let usuario = req.body.userName;
  let hashPassword = bcrypt.hashSync(req.body.password, salt);
  let email = req.body.email;
  let nacimiento = req.body.nacimiento;
  const rol = "admin";

  let createAdmin =
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
  connection.query(createAdmin, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render("../src/view/userAdmin", {
        alert: true,
        alertTitle: "¡OK!",
        alerMessage: "Nuevo Administrador Creado con exito",
        alerIcon: "success",
        showConfirmButton: false,
        timer: 5500,
        ruta: "gestorUsuarios",
      });
    }
  });

  // connection.query("INSERT INTO users set ?", [data], (error, results) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     res.render("../src/view/userAdmin", {
  //       alert: true,
  //       alertTitle: "Registro",
  //       alerMessage: "Usuario Creado con exito",
  //       alerIcon: "success",
  //       showConfirmButton: false,
  //       timer: 5500,
  //       ruta: "gestorUsuarios",
  //     });
  //   }
  // });
};

// const editUsuario = (req, res) => {
//   let id = req.params.id_product;

//   connection.query(
//     "SELECT * FROM product WHERE id_user =?",
//     [id],
//     (error, result) => {
//       if (error) {
//         throw error;
//       } else {
//         res.render("../src/view/updateProduct", { product: result[0] });
//         console.log("EDIRAR PRODUCTO", result[0]);
//       }
//     }
//   );
// };

const updateUser = (req, res) => {
  let id = req.params.id_product;
  console.log(id);
  const newProduct = req.body;
  console.log(newProduct);
  connection.query(
    "UPDATE product set ? WHERE id_product = ?",
    [newProduct, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("../src/view/productAdmin", {
          alert: true,
          alertTitle: "LISTO",
          alerMessage: "Producto Actualizado con exito",
          alerIcon: "success",
          showConfirmButton: false,
          timer: 5500,
          ruta: "gestorProductos",
        });
      }
    }
  );
};

const deleteUser = async (req, res) => {
  let idUser = req.params.id_user;
  connection.query(
    "DELETE FROM users WHERE id_user =?",
    [idUser],
    (err, fila) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/gestorUsuarios");
      }
    }
  );
};
module.exports = {
  createUserAdmin,
  deleteUser,
  updateUser,
};
