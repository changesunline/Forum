const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))

app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

app.listen(3000,(err) => {
	if (err) {
		throw err
	}
	console.log('Server is running')
})