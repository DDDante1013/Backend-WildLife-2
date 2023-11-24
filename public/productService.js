const express = require("express");
const Router = require.Router();
const connection = require("../controllers/connectionData");
const router = require("../src/routes/rutasWeb");

router.get("/", lista);

module.exports = router;
