const express = require('express');
const path = require('path')
const app = express();
const hbs = require('hbs')
const route = require('./routes/upload.js')(app)

app.set('views',path.join(__dirname,'views/'))
app.engine('html',hbs.__express)
app.set('view engine','html')
app.use(express.static('uploads'))
// console.log(path)
// console.log(__dirname)
app.get('/',function(req,res){
	res.render('index')
})

app.listen(3000)