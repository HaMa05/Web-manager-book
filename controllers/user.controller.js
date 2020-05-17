const bcrypt = require('bcrypt');
const saltRounds = 10;

const userModel = require("../models/user.model");

module.exports.index = (req, res) => {
	res.render('user/indexUser.pug');
}

// module.exports.see = (req, res) => {
// 	res.render('user/seeUser.pug', {
// 		users: users
// 	});
// }

module.exports.see = (req, res) => {
	let result = res.locals.result;
	res.render('user/seeUserPagination.pug', {
	users: result.perPage,
    next: result.next,
    page: result.page,
    previous: result.previous
	});
}

module.exports.add = (req, res) => {
	res.render('user/addUser.pug');
}

module.exports.postUser = (req, res) => {
	
	let data = req.body;
	req.body.isAdmin = false;
	req.body.wrongLoginCount = 0;
	if(!req.body.avatar)
		req.body.avatar = "https://res.cloudinary.com/buivanha/image/upload/v1589704912/avatarUrl/1137866_dlrfpb.png";
	bcrypt.hash(data.password, saltRounds, (err, hash) => {
		data.password = hash;
		userModel.insertMany(data);
		// db.get('users')
		// 	.push(data)
		// 	.write();
	})
	res.redirect('/users');
	// res.render('user/seeUser.pug', {
	// 	users: users
	// });
}

module.exports.deleteUser = (req, res) => {
	res.render('user/deleteUser.pug', {
		users: users
	});
}

module.exports.getDelete = (req, res) => {
	const id = req.params.id;
	db.get('users')
	  .remove({id: id})
	  .write()
	res.redirect('/users');
}