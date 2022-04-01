const productModel = require('../models/product.model')

exports.getProduct = (req, res, next) => {
    let id = req.params.id;
    productModel.getProductById(id).then(product => {
        res.render('')
    }).catch(err => console.log(err));
    
}