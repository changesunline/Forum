const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/forum')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
    	type: String,
    	required: true
    },
    nickname: {
    	type: String,
    	required: true
    },
    password: {
    	type: String,
    	required: true
    },
    create_time: {
    	type: Date,
    	default: Date.now
    },
    last_modified_time: {
    	type: Date,
    	default: Date.now
    },
    avatar: {
    	type: String,
    	default: '/public/img/avatar-default.png'
    },
    bio: {
    	type: String,
    	default: ''
    },
    gender: {
    	type: Number,
    	enum: [-1,0,1],
    	default: -1
    },
    birthday: {
    	type: Date
    },
    status: {
    	type: Number,
    	// 有权限，禁言，封号
    	enum: [0,1,2],
    	default: 0
    }
  })

module.exports = mongoose.model('User',userSchema)