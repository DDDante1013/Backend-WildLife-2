
const read =require("./read");
const writeJSON = require("./write");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const createUsers = (req, res) => {
    let oldJSON = read();
    const newUser = {
      id: oldJSON.length + 1,
      nombre: req.body.firstName,
      apellido: req.body.lastName,
      usuario: req.body.userName,
      hashPassword: bcrypt.hashSync(req.body.password, salt),
      email: req.body.email,
      telefono: req.body.phoneNumber,
      nacionalidad: req.body.nacionalidad,
      nacimiento: req.body.nacimiento,
    };
    oldJSON.push(newUser);
    writeJSON(oldJSON);
    res.sendStatus(200);
}

module.exports = createUsers;