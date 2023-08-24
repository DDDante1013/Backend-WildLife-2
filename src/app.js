const express = require("express");
const app = express();
const path =require("path");

const PORT =3000;

// app.set("view", path.resolve (__dirname, "./view"));
app.set("view engine", "ejs");

app.listen(PORT, () =>console.log("listening on port:", PORT));
app.use(express.static("public"));


// ...RUTAS DE LA PAGINA WEB...

app.get("/home", (req, res) => {
        res.render("../src/view/home")
});

app.get("/inicio", (req, res) =>{
        res.render("../src/view/inicio")
});

app.get("/registro", (req, res) =>{
        res.render("../src/view/REGISTRO")
});

app.get("/PRODUCTOS", (req, res) =>{
        res.render("../src/view/PRODUCTS")
});

app.get("/DETALLE", (req, res) =>{
        res.render("../src/view/DETAIL")
});

// app.get("/INICIO", (req, res) => {
//         res.sendFile(path.join(__dirname,"view/INICIO.HTML"))
// });

// app.get("/REGISTRO", (req, res) => {
//         res.sendFile(path.join(__dirname,"view/REGISTRO.HTML"))
// })

// app.get("/PRODUCTOS", (req, res) => {
//         res.sendFile(path.join(__dirname,"view/PRODUCTS.HTML"))
// })

// app.get("/DETAIL", (req, res) => {
//         res.sendFile(path.join(__dirname,"view/DETAIL.HTML"))
// })