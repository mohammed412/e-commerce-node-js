const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.getSingup = (req, res, next) => {
    res.render('singup')
}
exports.postSingup = (req, res, next) => {
    let body = req.body;
    userModel.createNewUser(body.name, body.surname, body.email, body.password).then(() => { res.redirect('/') }).catch(err => {
        console.log(err);
        res.redirect('singup')
    })
}

//Login
exports.getLogin = (req, res, next) => {
    res.render('login')
}
exports.postLogin = (req, res, next) => {
    let body = req.body
    userModel.getUsers(body.email).then(user => {
        bcrypt.compare(body.password, user.password).then(result => {
            if (result) {
                req.session.userId = user._id;
                res.redirect('/')
            }
            else {
                console.log("Password is incorrect")
                res.redirect('/login')
            }
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/login')
    })

    
}
