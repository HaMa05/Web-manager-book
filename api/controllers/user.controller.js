const bcrypt = require('bcrypt');
const saltRounds = 10;

const userModel = require("../../models/user.model");

module.exports.see = (req, res) => {
	let result = res.locals.result;
	res.json(result);
}

module.exports.postUser = (req, res) => {
	
	let data = req.body;
	req.body.isAdmin = false;
	req.body.wrongLoginCount = 0;
	if(!req.body.avatar)
		req.body.avatar = "https://res.cloudinary.com/buivanha/image/upload/v1589704912/avatarUrl/1137866_dlrfpb.png";
	// bcrypt.hash(data.password, saltRounds, (err, hash) => {
	// 	data.password = hash;
	// 	userModel.insertMany(data);
	// })
	res.json(data);
}

module.exports.deleteUser = async (req, res) => {
	var users = await userModel.find();
	res.json(users);
}

module.exports.getDelete = async (req, res) => {
	const id = req.params.id;
	await userModel.findByIdAndRemove(id);
	res.json(req.body);
}