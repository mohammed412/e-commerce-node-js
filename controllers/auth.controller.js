const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const validationResult = require("express-validator").validationResult;

exports.getSingup = (req, res, next) => {
    res.render('singup')
}
exports.postSingup = (req, res, next) => {
    return console.log(validationResult(req))
    let body = req.body;
    userModel.createNewUser(body.name, body.surname, body.email, body.password).then(() => { res.redirect('/') }).catch(err => {
        console.log(err);
        res.redirect('singup')
    })
}

//Login
exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('error')[0],
    })
}
exports.postLogin = (req, res, next) => {
    let body = req.body
    userModel.getUsers(body.email).then(user => {
        bcrypt.compare(body.password, user.password).then(result => {
            if (result) {
                req.session.userId = user._id;
                console.log(req.session.userId);
                console.log(user._id);
                res.redirect('/')
            }
            else {
                req.flash("error", "password incorect")
                res.redirect('/login')
            }
        })
    }).catch(err => {
        req.flash('error', err)
        res.redirect('/login')
    })

    
}

//Logout from

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('login')
    })
}