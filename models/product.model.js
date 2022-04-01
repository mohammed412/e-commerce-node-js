const mongoose = require('mongoose')
const DB_URL = "mongodb://localhost:27017/online-shop"
const Product = mongoose.model('product', new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    category: String
}))

//get all Products for home page 
exports.getAllProduct = () => {
    
    return new Promise((resoleve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            Product.find({}).then(products => {
                mongoose.disconnect();
                resoleve(products)
            })
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

//get Product description
exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            Product.findById(id).then(product => {
                mongoose.disconnect();
                resoleve(product)
            })
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}