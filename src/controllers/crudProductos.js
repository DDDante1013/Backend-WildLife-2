const connection = require("./connectionData");

const createProduct = async (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let image_url = req.body.image_url;

  let registerProduct =
    "INSERT INTO users ( name, price, description, image_url, ) VALUES ('" +
    name +
    "','" +
    price +
    "', '" +
    description +
    "','" +
    image_url +
    "')";
  // const data = req.body;
  connection.query(registerProduct, async (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render("../src/view/productAdmin", {
        alert: true,
        alertTitle: "Registration",
        alerMessage: "Registro Creado con exito",
        alerIcon: "success",
        showConfirmButton: false,
        timer: 5500,
        ruta: "productAdmin",
      });
    }
  });
};

module.exports = createProduct;
