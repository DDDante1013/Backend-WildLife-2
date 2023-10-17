const express = require ("express");
const app = express();
const read = require("../controllers/read");
const jwt = require ("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

app.use(cookieParser());

function accesoPublico(req,res,next){
    const logueado = revisarCookie(req);
    if(logueado == true)
    { return next()
    }else {   
   return res.redirect("/login");
  }

  }
  
  function revisarCookie(req){
    try{
      const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
      console.log( "COOKIE", cookieJWT);
      const decodificada = jwt.verify(cookieJWT,process.env.JWT_SECRET_KEY);
      console.log(decodificada)
      let userdata = read();
      let usuarioAResvisar = userdata.find((user) => user.usuario == decodificada.user);
      console.log(usuarioAResvisar)
      if(!usuarioAResvisar){
        return false
      }
      return true;
    }
    catch{
      return false;
    }
  }

  module.exports = {accesoPublico:accesoPublico,
                    revisarCookie: revisarCookie
  }