const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2");

const sesions = require("express-session");

const dotenv = require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));

//Settings

const PORT = 3000;
app.set("view engine", "ejs");
// app.set("view", path.resolve (__dirname, "./view"));
const path = require("path");
const { sequelize } = require("./controllers/connectionData");

//Middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes

app.use(require("./routes/rutasWeb"));
app.use(require("./routes/rutasWebPost"));

//Static

app.use(express.static("public"));

//404

app.use((req, res, next) => {
  res.status(404).render("../src/view/404");
});

//Server

app.listen(PORT, () => console.log("listening on port:", PORT));

// base datos

// async function main (){
//   try{
//     await sequelize.sync()
//   }
//   catch(error){
//     console.error(error)
//   }
// }
