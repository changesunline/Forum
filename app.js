const path = require('path')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// 分类路由
const topic_r = require('./routes/topic')
const session_r = require('./routes/session')
const set_r = require('./routes/setting')

const session = require('express-session')

// 配置express的post请求体解析提交表单数据的插件，必须要在加载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  // cookie: { secure: true }
}))

// 公开静态资源
// app.use('/', express.static(path.join(__dirname, './views')))
app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))

// 加载模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

// 加载所有路由
app.use('/',[topic_r,session_r])
app.use('/settings',set_r)

// 404页面
app.use(function (req,res) {
	res.render('404.html')
})

// 全局错误处理
app.use(function (err,req,res,next) {
	res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

// 服务器监听
app.listen(3000,(err) => {
	if (err) {
		throw err
	}
	console.log('Server is running')
})