const products = require('../models/product.model')

exports.getHome = (req, res) => {
    if (req.session.userId) {
        products.getAllProduct().then(products => {
            res.render('index', {
                products: products,
                isLogged: true
            })
        }).catch(err => console.log(err))
    }
    else {
        products
          .getAllProduct()
          .then((products) => {
            res.render("index", {
              products: products,
              isLogged: false,
            });
          })
          .catch((err) => console.log(err));
    }
}

exports.getSingup = (req, res) => {
    res.render('singup')
}