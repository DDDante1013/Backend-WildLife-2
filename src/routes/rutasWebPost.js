const express = require("express");
const app = express();
const router = express.Router();
const { registerCheck } = require("../controllers/registerCheck");
const createUsers = require("../controllers/createUsers");
const confirmedUser = require("../controllers/confirmedUser");
const createProduct = require("../controllers/crudProductos");
const connection = require("../controllers/connectionData");

router.post("/register", registerCheck, createUsers);
router.post("/login", confirmedUser);
router.post("/productAdmin", createProduct);

module.exports = router;
