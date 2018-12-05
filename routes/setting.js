// 用户设置。。。
const path = require('path')

const express = require('express')
const set_r = express.Router()

const User = require('../models/user')

const md5 = require('blueimp-md5')


// 用户基本信息页面渲染
set_r.get('/profile', function(req, res, next) {
	User.findOne({
		email: req.session.user.email
	},function (err,user) {
		if (err) {
			next(err)
		}
		res.render('./settings/profile.html',{
	    	user: user,
	    	path: req.path
	    })
	})
	// res.render('settings/profile.html')
    
})

// 用户基本信息修改保存
set_r.post('/profile', function(req, res, next) {
	let body = req.body
	User.findOneAndUpdate({
		email: body.email
	},body,function (err, user) {
		if (err) {
			return next(err)
		}
		for (let key in body) {
			user[key] = body[key]
		}
	    // res.render('./settings/profile.html',{
	    // 	user: user,
	    // 	path: req.path
	    // })
	    res.status(200).jsonp({
			err_code: 0,
			message: '保存成功'
		})
	})
})

// 密码修改保存
set_r.get('/admin', function(req, res) {
    res.render('settings/admin.html',{
    	user: req.session.user,
    	path: req.path
    })
})

// 注销账号
set_r.post('/cancel', function(req, res, next) {
    
})


module.exports = set_r