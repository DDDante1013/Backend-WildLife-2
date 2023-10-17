const express = require("express");
const app = express();
const router = express.Router();
const {registerCheck} = require("../controllers/registerCheck");
const createUsers = require("../controllers/createUsers");
const confirmedUser = require("../controllers/confirmedUser");


router.post("/register", registerCheck, createUsers);
router.post("/login",  confirmedUser);

module.exports = router;