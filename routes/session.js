// 注册、登陆、退出用户
const path = require('path')

const express = require('express')
const session_r = express.Router()

// 注册页面
session_r.get('/register', function (req, res) {
  res.render('register.html')
})

session_r.post('/register', function (req, res) {
  console.log(req.body)
})

// 登陆页面
session_r.get('/login', function (req, res) {
  res.render('login.html')
})

session_r.post('/login', function (req, res) {
  res.render('login.html')
})

// 退出登陆

module.exports = session_r