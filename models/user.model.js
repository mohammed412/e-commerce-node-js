const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const DB_URL = "mongodb://localhost:27017/online-shop";


const User = mongoose.model('user', new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String
}))

//Create new User
exports.createNewUser = (name, surname, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect();
                reject('Its already an email like that')
            }
            else {
                return bcrypt.hash(password, 10)
            }
        }).then(password => {
            let user = new User({
                name: name,
                surname: surname,
                email: email,
                password: password
            })
            
            return user.save()
        }).then(() => resolve('User Create')).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.getUsers = (email) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email})
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                resolve(user)
            }
            else {
                mongoose.disconnect();
                reject('there is no user')
            }
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}