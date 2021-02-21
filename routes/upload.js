const { REFUSED } = require('dns')

module.exports = function(app){
	const multer = require('multer')
	const fs = require('fs')
	const path = require('path')
	const upload = multer({
		storage: multer.diskStorage({
			destination:__dirname+'/../uploads/',
			filename:function(req,file,cb){
				let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
				cb(null, fileName);
			}
		})
	})
	app.post('/upload',upload.any(),function(req,res){
		if(!req.files[0]){
			res.render("upload",{uploads:"上传文件不能为空"})
			return
		}
		console.log(req.files[0])


		res.render('upload',{uploads:'http://pan.yang99.top/uploads/'+req.files[0]['filename']})
		return
	})
	app.get('/uploads/:id', function(req, res) {
		let filename = req.params.id
		let file = path.join(__dirname, `/../uploads/${filename}`)
		let extension=filename.substring(filename.lastIndexOf('.')+1);
		let Exp = RegExp("jpeg|png|gif|jpg")
		let re = new RegExp(Exp)
		if(!fs.existsSync(file)){
			res.status(404).send('没有这个文件')
		}
		console.log(re.test(extension))
		if(re.test(extension)){
			res.sendFile(file);
			console.log(file)
			return
		}
		res.download(file)
		// res.send('user' + req.params.id);
	});

}