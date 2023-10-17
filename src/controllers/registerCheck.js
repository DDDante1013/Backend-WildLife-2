
const { check} = require("express-validator");
const { validateResult } = require("../controllers/validate");

const registerCheck = [
  check("firstName")
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("ingrese un nombre valido"),
  check("lastName")
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("please enter only characters"),
  check("userName")
   .exists()
   .not()
   .isEmpty()
   .isLength({ min: 3, max: 10 })
   .withMessage("nombr de usuario incorrecto"),
  check("password")
  .exists()
  .not()
  .isEmpty()
  .isLength({ min: 3, max: 10 }), 
  check("email")
    .exists()
    .isEmail()
    .withMessage("ingrese un email valido"),
  check("phoneNumber")
    .exists()
    .isInt()
    .withMessage("please enter numbers")
    .isLength({ min: 7, max: 15 })
    .withMessage("phoneNumber can not be less than 7 and must be more than 15"),

  (req, res, next) => {
    validateResult(req, res, next)
  }
];

module.exports = { registerCheck };
