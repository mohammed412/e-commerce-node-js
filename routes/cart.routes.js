const express = require('express')
const cartController = require('../controllers/cart.conroller')
const router = express.Router()
const routeProtection = require('./protect/routeProtection')
const check = require('express-validator').check

router.get("/", routeProtection.isAuth, cartController.postCart);
router.post(
    '/',
    check('amount').not().isEmpty().withMessage('amount is required').isInt({ min: 1 }).withMessage('amount must be greater than 1'),
    routeProtection.isAuth,
    cartController.postCart
);

module.exports = router;