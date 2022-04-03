const bodyParser = require('body-parser')
const router = require('express').Router();
const check = require('express-validator').check;


const authController = require('../controllers/auth.controller')
const routeProtection = require('./protect/routeProtection')
 
//Singup
router.get('/singup',routeProtection.isLogged ,authController.getSingup)
router.post(
  "/singup",
  bodyParser.urlencoded({ extended: true }),

  check("name").not().isEmpty(),
  check("email").isEmail().withMessage("invalide format"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password should containt more than 8 characters"),
  check("confirmPassword").custom((value, { req }) => {
    if (req.body.password === value) return true;
    else throw "Password not confirmed";
  }),
  routeProtection.isLogged,
  authController.postSingup
);

//Login
router.get('/login',routeProtection.isLogged ,authController.getLogin) 
router.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  routeProtection.isLogged,
  authController.postLogin
);

//Logout
router.all('/logout', authController.logout)
module.exports = router;