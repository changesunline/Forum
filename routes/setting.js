// 用户设置。。。
const path = require('path')

const express = require('express')
const set_r = express.Router()

const User = require('../models/user')

const md5 = require('blueimp-md5')


// 用户基本信息页面渲染
set_r.get('/settings/profile', function(req, res, next) {
	User.findOne({
		email: req.session.user.email
	},function (err,user) {
		if (err) {
			return next(err)
		}
		res.render('./settings/profile.html',{
	    	user: user,
	    	path: req.path
	    })
	})
	// res.render('settings/profile.html')   
})

// 用户基本信息修改保存
set_r.post('/settings/profile', function(req, res, next) {
	let body = req.body
	User.findOneAndUpdate({
		email: body.email
	},body,(err, user) => {
		if (err) {
			return next(err)
		}
		for (let key in body) {
			user[key] = body[key]
		}
		req.session.user = user
	    res.status(200).jsonp({
			err_code: 0,
			message: '保存成功'
		})
	})
})

// 密码页面渲染
set_r.get('/settings/admin', function(req, res) {
    res.render('settings/admin.html',{
    	user: req.session.user,
    	path: req.path
    })
})

// 密码修改保存
set_r.post('/settings/admin', function(req, res, next) {
    let body = req.body
	User.findOne({
		email: req.session.user.email,
		password: md5(md5(body.oldPassword))
	},function (err, user) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.status(200).jsonp({
				err_code: 3,
				message: '原密码错误'
			})
		}
		if (body.newPassword !== body.password) {
			return res.status(200).jsonp({
				err_code: 2,
				message: '请在一次确认密码'
			})
		}
		if (user.password === md5(md5(body.password))) {
			return res.status(200).jsonp({
				err_code: 1,
				message: '新密码不能与原密码一致'
			})
		}
		user.password = md5(md5(body.password))
		user.save(function (err,newuser) {
			if (err) {
				return next(err)
			}
			req.session.user = newuser
	    
		    res.status(200).jsonp({
				err_code: 0,
				message: '密码修改成功'
			})
		})
	})
})

// 注销账号
set_r.get('/settings/delete', function(req, res, next) {
    User.findOneAndDelete({
    	email: req.session.user.email
    },function (err,user) {
    	if (err) {
    		return next(err)
    	}
    	// 删除路由
    	delete req.session.user

    	res.status(200).jsonp({
			err_code: 0,
			message: '账号已注销'
		})
    })
})


module.exports = set_r