// 新建、删除、修改、查看话题。。。
const path = require('path')

const express = require('express')
const topic_r = express.Router()

topic_r.get('/topics/new', function (req, res) {
  res.render('topic/new.html',{
  	user: req.session.user
  })
})

topic_r.get('/topics/show', function (req, res) {
  res.render('topic/show.html',{
  	user: req.session.user
  })
})

topic_r.get('/topics/edit', function (req, res) {
  res.render('topic/edit.html',{
  	user: req.session.user
  })
})
module.exports = topic_r