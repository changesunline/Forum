const path = require('path')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// 分类路由
const topic_r = require('./routes/topic')
const session_r = require('./routes/session')

// 配置express的post请求体解析提交表单数据的插件，必须要在加载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 公开静态资源
app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))

// 加载模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

// 加载所有路由
app.use('/',[topic_r,session_r])

// 服务器监听
app.listen(3000,(err) => {
	if (err) {
		throw err
	}
	console.log('Server is running')
})