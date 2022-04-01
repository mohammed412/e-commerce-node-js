const bodyParser = require('body-parser')
const router = require('express').Router();

const authController = require('../controllers/auth.controller') 


router.get('/singup', authController.getSingup)
router.post('/singup',bodyParser.urlencoded({extended: true}), authController.postSingup)


module.exports = router;