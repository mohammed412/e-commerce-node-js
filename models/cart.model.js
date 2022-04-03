const mongoose = require('mongoose')
const DB_URL = "mongodb://localhost:27017/online-shop";

const Cart = mongoose.model('cart', new mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number,
}))

export default addNewCart = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let cart = new Cart(data)
            return cart.save();
            
        }).then(() => {
            mongoose.disconnect();
            resolve()
        })
    }).catch(err => reject(err))
}