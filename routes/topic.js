// 新建、删除、修改、查看话题。。。
const path = require('path')

const express = require('express')
const topic_r = express.Router()

topic_r.get('/', function (req, res) {
  res.render('index.html')
})

module.exports = topic_r