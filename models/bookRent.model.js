var mongoose = require("mongoose");

var bookRentSchema = new mongoose.Schema(
	{
		userId: String,
		bookId: String,
		amount: Number,
		isComplete: Boolean
	},
	{
		collection: "bookRents"
	}
)

var BookRent = mongoose.model("BookRent", bookRentSchema);

module.exports = BookRent;