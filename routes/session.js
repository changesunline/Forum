// 注册、登陆、退出用户
const path = require('path')

const express = require('express')
const session_r = express.Router()

const User = require('../models/user')

const md5 = require('blueimp-md5')

session_r.get('/', function(req, res) {
    res.render('index.html', {
        user: req.session.user
    })
})

// 注册页面
session_r.get('/register', function(req, res) {
    res.render('register.html')
})

session_r.post('/register', function(req, res, next) {
    let body = req.body
    User.findOne({
        $or: [
            { email: body.email },
            { nickname: body.nickname }
        ]
    }, (err, data) => {
        if (err) {
            next(err)
        }
        if (data) {
            return res.status(200).jsonp({
                err_code: 1,
                message: 'Email or nickname is already exis'
            })
        }

        // 给密码二次加密
        body.password = md5(md5(body.password))
        new User(body).save((err, user) => {
            if (err) {
                next(err)
            }
            req.session.user = user
            res.status(200).jsonp({
                err_code: 0,
                message: 'Registration Successful'
            })
        })
    })
})

// 登陆页面
session_r.get('/login', function(req, res) {
    res.render('login.html')
})

session_r.post('/login', function(req, res, next) {
    let body = req.body
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, (err, user) => {
        if (err) {
            next(err)
        }
        if (!user) {
            return res.status(200).jsonp({
                err_code: 1,
                message: 'Email or password is invalid'
            })
        }
        req.session.user = user
        res.status(200).jsonp({
            err_code: 0,
            message: 'Login successfully'
        })
    })
})

// 退出登陆
session_r.get('/logout', function(req, res) {
	delete req.session.user
    res.render('login.html')
})

module.exports = session_r