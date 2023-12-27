const connection = require("./connectionData");
const controllers = {};

const cargaProducts = async (req, res) => {
  connection.query("SELECT * FROM product", (error, results) => {
    if (error) {
      res.json(error);
    } else {
      // connection.query("ALTER TABLE product")
      return res.send(results);
      // res.render("../src/view/productAdmin");
    }
  });
};
const cargaunProduct = async (req, res) => {
  connection.query(
    "SELECT * FROM product WHERE id =?",
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

const createProduct = (req, res) => {
  const data = req.body;
  console.log(data);
  connection.query("INSERT INTO product set ?", [data], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render("../src/view/productAdmin", {
        alert: true,
        alertTitle: "Registro",
        alerMessage: "Producto Cargado con exito",
        alerIcon: "success",
        showConfirmButton: false,
        timer: 5500,
        ruta: "gestorProductos",
      });
    }
  });
};

const editProduct = (req, res) => {
  let id = req.params.id;

  connection.query(
    "SELECT * FROM product WHERE id =?",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.render("../src/view/updateProduct", { product: result[0] });
        console.log("EDIRAR PRODUCTO", result[0]);
      }
    }
  );
};

const update = (req, res) => {
  let id = req.params.id;
  console.log(id);
  const newProduct = req.body;
  console.log(newProduct);
  connection.query(
    "UPDATE product set ? WHERE id = ?",
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

const deleteProduct = async (req, res) => {
  let idProduct = req.params.id;
  connection.query(
    "DELETE FROM product WHERE id =?",
    [idProduct],
    (err, fila) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/gestorProductos");
      }
    }
  );
};
module.exports = {
  createProduct,
  cargaProducts,
  cargaunProduct,
  deleteProduct,
  editProduct,
  update,
};
