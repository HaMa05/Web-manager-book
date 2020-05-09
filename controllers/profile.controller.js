
const db = require('../db');

module.exports.profile = (req, res) => {
	var cookieId = req.signedCookies.cookieId;
	var user = db.get("users").find({id: cookieId}).value();

	res.render("profile/profile.pug", {
		user: user
	})
}

module.exports.updateProfile = (req, res) => {
	var cookieId = req.signedCookies.cookieId;
	var user = db.get("users").find({id: cookieId}).value();

	res.render("profile/updateProfile.pug", {
		user: user
	})
}

module.exports.postProfile = (req, res) => {
	var cookieId = req.signedCookies.cookieId;
}