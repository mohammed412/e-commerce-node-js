const products = require('../models/product.model')

exports.getHome = (req, res) => {
    products.getAllProduct().then(products => {
        res.render('index', {products: products})
    }).catch(err=> console.log(err))
}

exports.getSingup = (req, res) => {
    res.render('singup')
}