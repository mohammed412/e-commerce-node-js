const bodyParser = require('body-parser')
const router = require('express').Router();

const authController = require('../controllers/auth.controller') 

//Singup
router.get('/singup', authController.getSingup)
router.post('/singup',bodyParser.urlencoded({extended: true}), authController.postSingup)

//Login
router.get('/login', authController.getLogin) 
router.post('/login',bodyParser.urlencoded({extended: true}), authController.postLogin)


module.exports = router;