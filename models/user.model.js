var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
	{
		name: String,
		avatar: String,
		phone: String,
		email: String,
		password: String,
		isAdmin: Boolean,
		wrongLoginCount: Number,
	},
	{
		collection: "users"
	}
)

var User = mongoose.model("User", userSchema);

module.exports = User;