var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema(
	{
		sessionId: String,
		books: Object 	
	},
	{
		collection: "session"
	}
)

var Session = mongoose.model("Session", sessionSchema);
module.exports = Session;